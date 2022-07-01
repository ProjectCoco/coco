package com.codestates.coco.comment.service;

import com.codestates.coco.comment.domain.Comment;
import com.codestates.coco.comment.domain.CommentDTO;
import com.codestates.coco.comment.domain.CommentUserDTO;
import com.codestates.coco.comment.repository.CommentRepository;
import com.codestates.coco.common.CustomException;
import com.codestates.coco.common.ErrorCode;
import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ContentRepository contentRepository;

    @Transactional
    public CommentDTO createComment(CommentDTO commentDTO){
        Comment comment = commentRepository.save(commentDTO.toEntity(commentDTO));
        return CommentDTO.builder()
                ._id(comment.get_id())
                .comment(comment.getComment())
                .author(comment.getAuthor())
                .contentId(comment.getContentId())
                .createdDate(comment.getCreatedDate())
                .build();
    }

    public List<CommentDTO> getAllComment(String contentId){
        contentRepository.findById(contentId).orElseThrow(() ->  new CustomException(ErrorCode.CANNOT_FOUND_CONTENT));
        return commentRepository.findAllByContentId(contentId);
    }

    public List<CommentUserDTO> getAllUserComment(String username){

        //refactoring 필요
        List<CommentUserDTO> comments = commentRepository.findAllByAuthor(username);
        for (CommentUserDTO comment : comments) {
            comment.setTitle(contentRepository.findById(comment.getContentId()).orElse(null).getTitle());
        }
        return comments;
    }

    @Transactional
    public CommentDTO putComment(String id, CommentDTO commentDTO, String username){

        if(!username.equals(commentDTO.getAuthor())){
            throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);
        }

        Comment comment = commentRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_COMMENT));
        if(!commentDTO.equals(comment)) {
            comment.update(commentDTO.getComment());
        }

        commentRepository.save(comment);
        return CommentDTO.builder()
                ._id(comment.get_id())
                .comment(comment.getComment())
                .author(comment.getAuthor())
                .contentId(comment.getContentId())
                .createdDate(comment.getCreatedDate())
                .build();
    }

    @Transactional
    public Boolean deleteComment(String id, String username){

        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment!=null) {
            if (!comment.getAuthor().equals(username)) throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);
            commentRepository.deleteById(id);
            return true;
        } else {
            throw new CustomException(ErrorCode.CANNOT_FOUND_COMMENT);
        }
    }

}
