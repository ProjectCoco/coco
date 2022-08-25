package com.codestates.coco.anonymousBoard.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnonComment {
    private String comment;
    private String password;
}
