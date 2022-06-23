package com.codestates.coco.comment.controller;

import com.codestates.coco.comment.domain.CommentDTO;
import com.codestates.coco.comment.service.CommentService;
import com.codestates.coco.common.CustomValidException;
import com.codestates.coco.common.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
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
    public ResponseEntity<CommentDTO> createComment(@Valid @RequestBody CommentDTO commentDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            throw new CustomValidException(ErrorCode.INVALID_COMMENT_FORM, bindingResult);
        }
        return new ResponseEntity<>(commentService.createComment(commentDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<List<CommentDTO>> getComment(@PathVariable String contentId){
        return new ResponseEntity<>(commentService.getAllComment(contentId), HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable String id, @Valid @RequestBody CommentDTO commentDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            throw new CustomValidException(ErrorCode.INVALID_COMMENT_FORM, bindingResult);
        }
        return new ResponseEntity<>(commentService.putComment(id, commentDTO), HttpStatus.CREATED);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteComment(@PathVariable String id){
        return new ResponseEntity<>(commentService.deleteComment(id), HttpStatus.NO_CONTENT);
    }
}
