package com.codestates.coco.user.controller;

import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.domain.UserDTO;
import com.codestates.coco.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/signup")
    public ResponseEntity<User> saveUser(@Valid @RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.signUp(userDTO), HttpStatus.CREATED);
    }

    @GetMapping("/api/email/{email}/check")
    public ResponseEntity<Boolean> emailCheck(@PathVariable String email){
        return new ResponseEntity<>(userService.emailCheck(email), HttpStatus.OK);
    }

    @GetMapping("/api/username/{username}/check")
    public ResponseEntity<Boolean> usernameCheck(@PathVariable String username){
        return new ResponseEntity<>(userService.usernameCheck(username), HttpStatus.OK);
    }
}
