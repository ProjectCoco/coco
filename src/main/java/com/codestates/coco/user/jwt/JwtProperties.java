package com.codestates.coco.user.jwt;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class JwtProperties {

    private String header;
    private String secret;
    private long expire;

    public JwtProperties(@Value("${jwt.header}") String header, @Value("${jwt.secret}") String secret, @Value("${jwt.token-validity-in-milliseconds}") long expire) {
        this.header = header;
        this.secret = secret;
        this.expire = expire;
    }
}
