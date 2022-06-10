package com.codestates.coco.user.controller;

import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.domain.UserDTO;
import com.codestates.coco.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    //
    @PostMapping("/signup")
    public ResponseEntity<User> saveUser(@RequestBody UserDTO userLoginDTO) {

        return new ResponseEntity<>(userService.signUp(userLoginDTO), HttpStatus.CREATED);
    }
}
