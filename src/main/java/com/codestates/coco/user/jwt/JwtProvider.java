package com.codestates.coco.user.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.codestates.coco.common.CustomException;
import com.codestates.coco.common.ErrorCode;
import com.codestates.coco.user.config.RedisUtil;
import com.codestates.coco.user.config.auth.PrincipalDetails;
import com.codestates.coco.user.config.auth.PrincipalDetailsService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Getter
@RequiredArgsConstructor
public class JwtProvider {
    @Value("${jwt.access-header}")
    private String accessHeader;

    @Value("${jwt.refresh-header}")
    private String refreshHeader;

    @Value("${jwt.prefix}")
    private String prefix;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-token-validity-in-milliseconds}")
    private long accessExpire;

    @Value("${jwt.refresh-token-validity-in-milliseconds}")
    private long refreshExpire;

    private final PrincipalDetailsService principalDetailsService;
    private final RedisUtil redisUtil;

    public String createToken(PrincipalDetails principalDetails) {
        return JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + accessExpire)) // 만료시간 설정
                .withClaim("email", principalDetails.getUser().getEmail()) // private claim
                .withClaim("username", principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512(secret)); // Secret-key 설정
    }

    public String createToken(String email, String username) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + accessExpire)) // 만료시간 설정
                .withClaim("email", email) // private claim
                .withClaim("username", username)
                .sign(Algorithm.HMAC512(secret)); // Secret-key 설정
    }

    public String createRefreshToken(PrincipalDetails principalDetails) {

        String refreshToken = JWT.create()
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshExpire)) // 만료시간 설정
                .withClaim("email", principalDetails.getUser().getEmail())
                .sign(Algorithm.HMAC512(secret));

        redisUtil.setDataExpire(refreshToken, principalDetails.getUser().getEmail(), refreshExpire);

        return refreshToken;
    }

    public boolean validateToken(String jwtToken) {
        try {
            JWT.require(Algorithm.HMAC512(secret)).build().verify(jwtToken);
        } catch (TokenExpiredException e) {
            throw new CustomException(ErrorCode.EXPIRED_AUTH_TOKEN);
        } catch (JWTDecodeException e) {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        }
        return true;
    }

    public String resovleToken(String token) {
        return token.replace(prefix, "");
    }

    public String getEmailFromClaim(String jwtToken) {
        return JWT.decode(jwtToken).getClaim("email").asString();
    }

    public String getUsernameFromClaim(String jwtToken) {
        return JWT.decode(jwtToken).getClaim("username").asString();
    }

    public long getExpiryMilliSecond(String jwtToken) {
        return JWT.decode(jwtToken).getExpiresAt().getTime() - System.currentTimeMillis();
    }

    public Authentication getAuthentication(String jwtToken) {
        UserDetails userDetails = principalDetailsService.loadUserByUsername(getEmailFromClaim(jwtToken));
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public String correctUsernameToken(String token, String username) {
        long remainExpiry = getExpiryMilliSecond(token);
        String email = JWT.decode(token).getClaim("email").asString();
        redisUtil.setBlackList(token, email, remainExpiry);

        return createToken(email, username);
    }
    public String reissueRefreshToken(String refreshToken, PrincipalDetails principalDetails) {
        long remainExpiry = getExpiryMilliSecond(refreshToken);
        redisUtil.deleteData(refreshToken);
        redisUtil.setBlackList(refreshToken, principalDetails.getUser().getEmail(), remainExpiry);

        return createRefreshToken(principalDetails);
    }

    public Boolean hasBlackList(String token) {
        return redisUtil.hasBlackList(token);
    }


}
