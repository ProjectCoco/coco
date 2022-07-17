package com.codestates.coco.user.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    @Email(message = "Email 형식을 갖춰야합니다.")
    private String email;

    @NotBlank(message = "기수는 공백일 수 없습니다.")
    private String groupInfo;

    @NotBlank(message = "Usename은 공백일 수 없습니다.")
    private String username;

    private String profileImg;

    public User toEntity(UserProfileDTO userProfileDTO) {
        return new User(userProfileDTO.getEmail(), userProfileDTO.getUsername(), userProfileDTO.getGroupInfo(), userProfileDTO.getProfileImg());
    }
}
