package com.codestates.coco.user.domain;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserDTO {

    @Email(message = "NOT_VALID_EMAIL")
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String codeNum;

    @NotBlank
    private String username;

    public User toEntity(UserDTO userDTO) {
        return new User(userDTO.getEmail(), userDTO.getPassword(), userDTO.username,userDTO.getCodeNum());
    }
}
