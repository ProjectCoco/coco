package com.codestates.coco.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthErrorResponse {
    private static final String contenType = "application/json;charset=UTF-8";

    public static void toResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        ObjectMapper om = new ObjectMapper();
        // LocalDateTime 자료형에 대해 Objectmapper serialize 오류를 발생한다.
        om.registerModule(new JavaTimeModule()).disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        response.setContentType(contenType);
        response.setStatus(errorCode.getHttpStatus().value());
        response.getWriter().write(om.writeValueAsString(ErrorResponse.of(errorCode)));
    }
}
