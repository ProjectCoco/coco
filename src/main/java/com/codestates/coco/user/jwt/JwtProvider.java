package com.codestates.coco.user.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.codestates.coco.user.config.auth.PrincipalDetails;
import com.codestates.coco.user.config.auth.PrincipalDetailsService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
@Getter
@RequiredArgsConstructor
public class JwtProvider {
    @Value("${jwt.access-header}")
    private String accessHeader;

    @Value("${jwt.refresh-header}")
    private String refreshHeader;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-token-validity-in-milliseconds}")
    private long accessExpire;

    @Value("${jwt.refresh-token-validity-in-milliseconds}")
    private long refreshExpire;

    private final PrincipalDetailsService principalDetailsService;

    public String createToken(PrincipalDetails principalDetails) {
        return JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + accessExpire)) // 만료시간 설정
                .withClaim("email", principalDetails.getUser().getEmail()) // private claim
                .withClaim("username", principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512(secret)); // Secret-key 설정
    }

    public String createRefreshToken() {
        return JWT.create()
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshExpire)) // 만료시간 설정
                .sign(Algorithm.HMAC512(secret));
    }

    public boolean validateToken(String jwtToken) {
        JWT.require(Algorithm.HMAC512(secret)).build().verify(jwtToken);
        return true;
    }

    public String resovleToken(HttpServletRequest request) {
        return request.getHeader(accessHeader).replace("Bearer ", "");
    }

    public String getEmailFromClaim(String jwtToken) {
        return JWT.decode(jwtToken).getClaim("email").asString();
    }

    public String getUsernameFromClaim(String jwtToken) {
        return JWT.decode(jwtToken).getClaim("username").asString();
    }

    public Authentication getAuthentication(String jwtToken) {
        UserDetails userDetails = principalDetailsService.loadUserByUsername(getEmailFromClaim(jwtToken));
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }


}
