package com.codestates.coco.user.service;

import com.codestates.coco.comment.domain.Comment;
import com.codestates.coco.comment.domain.CommentDTO;
import com.codestates.coco.common.CustomException;
import com.codestates.coco.common.ErrorCode;
import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.domain.UserDTO;
import com.codestates.coco.user.domain.UserProfileDTO;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${user.profileImg}")
    private String basicProfileImg;

    public User signUp(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userDTO.setProfileImg(basicProfileImg);
        return userRepository.save(userDTO.toEntity(userDTO));
    }

    public Boolean emailCheck(String email) {
        return !userRepository.existsByEmail(email);
    }

    public Boolean usernameCheck(String username) {
        return !userRepository.existsByUsername(username);
    }

    public UserProfileDTO getProfile(String username, String loginUsername){

        if (username.equals(loginUsername)) {
            User user = userRepository.findByUsername(username);
            return new UserProfileDTO(
                    user.getEmail(),
                    user.getGroupInfo(),
                    user.getUsername(),
                    user.getProfileImg());
        } else {
            throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);
        }
    }

    public UserProfileDTO putProfile(UserProfileDTO userProfileDTO, String username, String loginUsername){
        if (username.equals(loginUsername)) {
            User user = userRepository.findByUsername(username);
            user.update(userProfileDTO.getGroupInfo(), userProfileDTO.getProfileImg());
            userRepository.save(user);
            return userProfileDTO;
        } else {
            throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);
        }
    }
}
