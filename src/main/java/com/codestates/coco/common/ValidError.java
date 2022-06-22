package com.codestates.coco.common;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ValidError {
    private final String errorName;
    private final String msg;
}
