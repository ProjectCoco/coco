package com.codestates.coco.user.service;

import com.codestates.coco.comment.domain.Comment;
import com.codestates.coco.comment.repository.CommentRepository;
import com.codestates.coco.common.CustomException;
import com.codestates.coco.common.ErrorCode;
import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.repository.ContentRepository;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.domain.UserContentFavorDTO;
import com.codestates.coco.user.domain.UserDTO;
import com.codestates.coco.user.domain.UserProfileDTO;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ContentRepository contentRepository;
    private final CommentRepository commentRepository;

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

    public UserProfileDTO getProfile(String username, String loginUsername) {

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

    public UserProfileDTO putProfile(UserProfileDTO userProfileDTO, String username, String loginUsername) {
        //todo: content, comment가 user 객체를 참조
        if (username.equals(loginUsername)) {
            User user = userRepository.findByUsername(username);
            if (!usernameCheck(userProfileDTO.getUsername())) throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
            user.update(userProfileDTO.getGroupInfo(), userProfileDTO.getProfileImg(), userProfileDTO.getUsername());
            userRepository.save(user);
            //contents
            List<Content> contents = contentRepository.findAllByUsername(username);
            contents.stream().forEach(content -> content.setUsername(userProfileDTO.getUsername()));
            contentRepository.saveAll(contents);

            //comments
            List<Comment> comments = commentRepository.findAllByUser(username);
            comments.stream().forEach(comment -> comment.setUsername(userProfileDTO.getUsername()));
            commentRepository.saveAll(comments);

            return userProfileDTO;
        } else {
            throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);
        }
    }

    public List<UserContentFavorDTO> getContentFavor(String username, String loginUsername) {
        if (username.equals(loginUsername)) {
            User user = userRepository.findByUsername(username);
            return user.getContentFavor().stream().map(content -> {
                UserContentFavorDTO userContentFavorDTO = new UserContentFavorDTO();
                userContentFavorDTO.setContentId(content.get_id());
                userContentFavorDTO.setTitle(content.getTitle());

                return userContentFavorDTO;
            }).collect(Collectors.toList());
        } else {
            throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);
        }
    }
    
/*    public void addContentFavor(String userId, String contentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_USER));
        user.addContentFavor(contentId);
        userRepository.save(user);
    }

    public void removeContentFavor(String userId, String contentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_USER));
        user.removeContentFavor(contentId);
        userRepository.save(user);
    }*/
}
