package com.codestates.coco.comment.controller;

import com.codestates.coco.comment.domain.Comment;
import com.codestates.coco.comment.domain.CommentDTO;
import com.codestates.coco.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<String> createComment(@RequestBody CommentDTO commentDTO){
        commentService.createComment(commentDTO);
        return new ResponseEntity<>("게시성공", HttpStatus.OK);
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<List<Comment>> getComment(@PathVariable String contentId){
        return new ResponseEntity<>(commentService.getAllComment(contentId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable String id, @RequestBody CommentDTO commentDTO){
        return new ResponseEntity<>(commentService.putComment(id, commentDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable String id){
        commentService.deleteComment(id);
        return new ResponseEntity<>("삭제 성공", HttpStatus.OK);
    }
}
