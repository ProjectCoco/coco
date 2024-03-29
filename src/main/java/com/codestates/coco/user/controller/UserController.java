package com.codestates.coco.user.controller;

import com.codestates.coco.user.auth.domain.PrincipalDetails;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.domain.UserContentFavorDTO;
import com.codestates.coco.user.domain.UserDTO;
import com.codestates.coco.user.domain.UserProfileDTO;
import com.codestates.coco.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> saveUser(@Valid @RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.signUp(userDTO), HttpStatus.CREATED);
    }

    @GetMapping("/email/{email}/check")
    public ResponseEntity<Boolean> emailCheck(@PathVariable String email){
        return new ResponseEntity<>(userService.emailCheck(email), HttpStatus.OK);
    }

    @GetMapping("/username/{username}/check")
    public ResponseEntity<Boolean> usernameCheck(@PathVariable String username){
        return new ResponseEntity<>(userService.usernameCheck(username), HttpStatus.OK);
    }

    //TODO 프로필조회
    @GetMapping("/userprofile/{username}")
    public ResponseEntity<UserProfileDTO> getProfile(@PathVariable String username, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return new ResponseEntity<>(userService.getProfile(username, principalDetails.getUser().getUsername()), HttpStatus.OK);
    }


    //TODO 프로필수정
    @PutMapping("/userprofile/{username}")
    public ResponseEntity<UserProfileDTO> putProfile(
            @PathVariable String username,
            @Valid @RequestBody UserProfileDTO userProfileDTO,
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            HttpServletRequest request,
            HttpServletResponse response) {
        return new ResponseEntity<>(userService.putProfile(userProfileDTO, username, principalDetails.getUser().getUsername(), request, response), HttpStatus.CREATED);
    }

    @GetMapping("/userfavor/{username}")
    public ResponseEntity<List<UserContentFavorDTO>> getUserFavor(@PathVariable String username, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return new ResponseEntity<>(userService.getContentFavor(username, principalDetails.getUser().getUsername()), HttpStatus.OK);
    }



    @PostMapping("/token")
    public ResponseEntity<String> reissueToken(HttpServletRequest request, HttpServletResponse response) {
        userService.reissueToken(request, response);
        return new ResponseEntity<>("재발급 성공", HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request, HttpServletResponse response) {
        userService.logout(request, response);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
