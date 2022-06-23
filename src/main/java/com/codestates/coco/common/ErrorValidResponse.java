package com.codestates.coco.common;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Builder
public class ErrorValidResponse {

    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String code;
    private final Map<String, String> errorList;

    public static ResponseEntity<ErrorValidResponse> toResponseEntity(ErrorCode errorCode, BindingResult errorList) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorValidResponse.builder()
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.getHttpStatus().name())
                        .code(errorCode.name())
                        .errorList(errorList.getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)))
                        .build()
                );
    }
}
