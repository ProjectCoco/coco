package com.codestates.coco.common;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ErrorValidResponse {

    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String code;
    private final List<ValidError> message;

    public static ResponseEntity<ErrorValidResponse> toResponseEntity(ErrorCode errorCode, List<>) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorValidResponse.builder()
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.getHttpStatus().name())
                        .code(errorCode.name())
                        .message()
                        .build()
                );
    }
}
}
