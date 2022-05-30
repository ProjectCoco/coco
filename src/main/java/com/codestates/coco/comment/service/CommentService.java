package com.codestates.coco.comment.service;

import com.codestates.coco.comment.domain.Comment;
import com.codestates.coco.comment.domain.CommentDTO;
import com.codestates.coco.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    @Transactional
    public void createComment(CommentDTO commentDTO){
        commentRepository.save(commentDTO.toEntity(commentDTO));
    }

    public List<Comment> getAllComment(String content_id){
        return commentRepository.findAllByContentId(content_id);
    }

    @Transactional
    public void putComment(String _id){

    }

    @Transactional
    public void deleteComment(){

    }

}
