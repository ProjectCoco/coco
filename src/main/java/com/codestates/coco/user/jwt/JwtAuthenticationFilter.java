package com.codestates.coco.user.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.codestates.coco.user.config.auth.PrincipalDetails;
import com.codestates.coco.user.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.Date;

// login 요청 시 username 및 password를 post 전송하면
// UsernamePasswordAuthenticationFilter가 동작함.
// 로그인을 진행하는 AuthenticationManager를 추가해주어야 한다.
// 즉, 해당 클래스는 로그인 인증 전반에 관한 내용이다.
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtProperties jwtProperties;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtProperties jwtProperties) {
        // login process url을 새로이 설정
        super.setFilterProcessesUrl("/api/login");
        this.authenticationManager = authenticationManager;
        this.jwtProperties = jwtProperties;
    }

    /*    @Value("${jwt.header}")
    private String header;
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.token-validity-in-milliseconds}")
    private long expire;*/



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

        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtProperties.getExpire())) // 만료시간 설정
                .withClaim("email", principalDetails.getUser().getEmail()) // private claim
                .sign(Algorithm.HMAC512(jwtProperties.getSecret())); // Secret-key 설정

        response.addHeader(jwtProperties.getHeader(), "Bearer "+jwtToken);
        
    }
}
