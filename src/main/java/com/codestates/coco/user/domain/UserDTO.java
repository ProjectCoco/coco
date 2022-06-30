package com.codestates.coco.user.domain;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserDTO {

    @Email(message = "Email 형식을 갖춰야합니다.")
    private String email;

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    private String password;

    @NotBlank(message = "기수는 공백일 수 없습니다.")
    private String groupInfo;

    @NotBlank(message = "Usename은 공백일 수 없습니다.")
    private String username;

    public User toEntity(UserDTO userDTO) {
        return new User(userDTO.getEmail(), userDTO.getPassword(), userDTO.getUsername(), userDTO.getGroupInfo());
    }
}
