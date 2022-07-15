package com.codestates.coco.user.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.codestates.coco.user.config.auth.PrincipalDetails;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 시큐리티가 filter를 가지는데, 그 필터 중 BasicAuthenticationFilter가 있다.
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 해당 필터를 사용한다.
// 권한이나 인증이 필요하지 않다면 사용하지 않는다.
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    
    private UserRepository userRepository;
    private JwtProperties jwtProperties;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, JwtProperties jwtProperties) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.jwtProperties = jwtProperties;//authorization : noExist
    }

    // 인증 또는 권한요청이 올때 해당 필터 사용
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String jwtHeader = request.getHeader(jwtProperties.getHeader());

        // Token이 존재하는 지 확인
        if (jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }

        // JWT 검증
        String jwtToken = request.getHeader(jwtProperties.getHeader()).replace("Bearer ", "");

        String email = null;
        try {
            email = JWT.require(Algorithm.HMAC512(jwtProperties.getSecret())).build().verify(jwtToken).getClaim("email").asString();
        } catch (Exception e) {
            chain.doFilter(request, response);
            return;
        }

        // 서명이 정상적으로 되면 username이 담긴다.
        if (email != null) {
            User userEntity = userRepository.findByEmail(email);

            PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

            // AuthenticationManager를 통한 생성이 아닌 Jwt 토큰 서명을 통해 Authentication 객체를 생성
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

            // 강제로 시큐리티의 세션영역에 접근해서 Authentication 저장.
            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);

        }
    }
}
