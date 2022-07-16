package com.codestates.coco.user.jwt;

import org.springframework.security.authentication.AuthenticationManager;
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
    private final JwtProvider jwtProvider;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        super(authenticationManager);
        this.jwtProvider = jwtProvider;
    }

    // 인증 또는 권한요청이 올때 해당 필터 사용
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String accessHeader = request.getHeader(jwtProvider.getAccessHeader());

        // Token이 존재하는 지 확인
        if (accessHeader != null && accessHeader.startsWith("Bearer")) {
            // JWT 검증
            try {
                String jwtToken = jwtProvider.resovleToken(request.getHeader(jwtProvider.getAccessHeader()));

                // 서명이 정상적으로 되면 username이 담긴다.
                if (jwtProvider.validateToken(jwtToken) && !jwtProvider.hasBlackList(jwtToken)) {
                    // AuthenticationManager를 통한 생성이 아닌 Jwt 토큰 서명을 통해 Authentication 객체를 생성
                    Authentication authentication = jwtProvider.getAuthentication(jwtToken);

                    // 강제로 시큐리티의 세션영역에 접근해서 Authentication 저장.
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                }else{
                    System.out.println("검증 실패 또는 blacklist 예외 추가 처리");
                }
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("Authorization 예외발생");
            }
        }
        chain.doFilter(request, response);
    }
}
