package com.codestates.coco.comment.controller;

import com.auth0.jwt.JWT;
import com.codestates.coco.comment.domain.CommentDTO;
import com.codestates.coco.comment.domain.CommentUserDTO;
import com.codestates.coco.comment.service.CommentService;
import com.codestates.coco.user.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @Secured("ROLE_USER")
    @PostMapping("")
    public ResponseEntity<CommentDTO> createComment(@Valid @RequestBody CommentDTO commentDTO){
        return new ResponseEntity<>(commentService.createComment(commentDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<List<CommentDTO>> getComment(@PathVariable String contentId){
        return new ResponseEntity<>(commentService.getAllComment(contentId), HttpStatus.OK);
    }

    //TODO jwt로 username 가져오기
    @GetMapping("/username/{username}")
    public ResponseEntity<List<CommentUserDTO>> getUserComment(@PathVariable String username){
        return new ResponseEntity<>(commentService.getAllUserComment(username), HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> updateComment(
            @PathVariable String id,
            @Valid @RequestBody CommentDTO commentDTO,
            @AuthenticationPrincipal PrincipalDetails principalDetails){
        return new ResponseEntity<>(commentService.putComment(id, commentDTO, principalDetails.getUser().getUsername()), HttpStatus.CREATED);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteComment(
            @PathVariable String id,
            @AuthenticationPrincipal PrincipalDetails principalDetails){
        return new ResponseEntity<>(commentService.deleteComment(id, principalDetails.getUser().getUsername()), HttpStatus.NO_CONTENT);
    }
}
