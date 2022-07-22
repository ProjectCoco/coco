package com.codestates.coco.user.jwt;

import com.codestates.coco.common.AuthErrorResponse;
import com.codestates.coco.common.ErrorCode;
import com.codestates.coco.user.config.auth.PrincipalDetails;
import com.codestates.coco.user.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// login 요청 시 username 및 password를 post 전송하면
// UsernamePasswordAuthenticationFilter가 동작함.
// 로그인을 진행하는 AuthenticationManager를 추가해주어야 한다.
// 즉, 해당 클래스는 로그인 인증 전반에 관한 내용이다.
@Log4j2
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        // login process url을 새로이 설정
        super.setFilterProcessesUrl("/api/login");
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    // login 요청 시 로그인 시도를 하는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // 1. username 및 password를 받는다.
        try {
            ObjectMapper om = new ObjectMapper();
            User user = om.readValue(request.getInputStream(), User.class);

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

            // 2. AuthenticaionManager로 로그인을 시도하면 PrincipalDetailsService의 loadUserByUsername() 실행
            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            // 3. PrincipalDetails를 세션에 담는다. (권한 관리를 위한 용도)
            // 권한관리를 Security에서 진행하기 때문에 편리를 위해 세션을 이용해서 권한처리를 하는 것이다.


            return authentication;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    // attemptAuthentication 이후 인증이 완료되면 해당 함수 실행
    // 4. JWT토큰 생성 및 응답
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // attemptAuthentication() 결과가 authResult로 담겨온다.
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        response.addHeader(jwtProvider.getRefreshHeader(), jwtProvider.getPrefix() + jwtProvider.createRefreshToken(principalDetails));
        response.addHeader(jwtProvider.getAccessHeader(), jwtProvider.getPrefix() + jwtProvider.createToken(principalDetails));

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        AuthErrorResponse.toResponse(response, ErrorCode.UNAUTHENTICATED_MEMBER);
    }

/*    private void toResponse(HttpServletResponse response) throws IOException {
        ObjectMapper om = new ObjectMapper();

        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String, Object> map = new HashMap<>();
        map.put("status", 401);
        map.put("code", "UNAUTHENTICATED_MEMBER");
        map.put("message", "이메일 또는 비밀번호가 올바르지 않습니다.");
        response.getWriter().write(om.writeValueAsString(map));
    }*/

}
