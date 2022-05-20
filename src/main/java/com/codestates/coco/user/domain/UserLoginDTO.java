package com.codestates.coco.user.domain;

import lombok.Data;

@Data
public class UserLoginDTO {

    private String email;
    private String password;
}
