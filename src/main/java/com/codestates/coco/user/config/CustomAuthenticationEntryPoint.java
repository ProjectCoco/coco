package com.codestates.coco.user.config;

import com.codestates.coco.common.AuthErrorResponse;
import com.codestates.coco.common.ErrorCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        if(response.getStatus()!=ErrorCode.EXPIRED_AUTH_TOKEN.getHttpStatus().value()) AuthErrorResponse.toResponse(response, ErrorCode.UNAUTHENTICATED);
    }
}
