package com.codestates.coco.user.auth.exception;

import com.codestates.coco.common.AuthErrorResponse;
import com.codestates.coco.common.ErrorCode;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class CustomDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        AuthErrorResponse.toResponse(response, ErrorCode.FORBIDDEN_MEMBER);
    }


}
