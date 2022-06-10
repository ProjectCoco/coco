package com.codestates.coco.user.domain;

import lombok.Data;

@Data
public class UserDTO {

    private String email;
    private String password;
    private String codeNum;
    private String username;

    public User toEntity(UserDTO userDTO) {
        return new User(userDTO.getEmail(), userDTO.getPassword(), userDTO.username,userDTO.getCodeNum());
    }
}
