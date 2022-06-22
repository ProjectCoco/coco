package com.codestates.coco.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.ObjectError;

import java.util.List;

@Getter
@AllArgsConstructor
public class CustomValidException extends RuntimeException{
    private final ErrorCode errorCode;
    private final List<ObjectError> errorList;
}
