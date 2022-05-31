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

    public List<Comment> getAllComment(String contentId){
        return commentRepository.findAllByContentId(contentId);
    }

    @Transactional
    public Comment putComment(String id, CommentDTO commentDTO){
        Comment comment = commentRepository.findById(id).orElse(null);
        if(!commentDTO.equals(comment)) {
            comment.update(commentDTO.getComment());
        }

        commentRepository.save(comment);
        return comment;
    }

    @Transactional
    public void deleteComment(String id){
        commentRepository.deleteById(id);
    }

}
