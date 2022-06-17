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
import org.springframework.validation.BindingResult;
import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    //
    @PostMapping("/signup")
    public ResponseEntity<User> saveUser(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult ) {

        return new ResponseEntity<>(userService.signUp(userDTO), HttpStatus.CREATED);
    }
}
