package com.codestates.coco.studyBoard.comment.service;

import com.codestates.coco.studyBoard.comment.domain.Comment;
import com.codestates.coco.studyBoard.comment.domain.CommentDTO;
import com.codestates.coco.studyBoard.comment.domain.CommentUserDTO;
import com.codestates.coco.studyBoard.comment.repository.CommentRepository;
import com.codestates.coco.common.CustomException;
import com.codestates.coco.common.ErrorCode;

import com.codestates.coco.studyBoard.contents.domain.Content;
import com.codestates.coco.studyBoard.contents.repository.ContentRepository;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ContentRepository contentRepository;
    private final UserRepository userRepository;

    @Transactional
    public CommentDTO createComment(CommentDTO commentDTO){
        Comment comment = commentRepository.save(commentDTO.toEntity(commentDTO));
        Content content = contentRepository.findById(comment.getContentId()).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_CONTENT));

        // 게시글의 댓글 갯수
        content.addCommentCount();
        contentRepository.save(content);

        return CommentDTO.builder()
                ._id(comment.get_id())
                .comment(comment.getComment())
                .username(comment.getUsername())
                .contentId(comment.getContentId())
                .createdDate(comment.getCreatedDate())
                .build();
    }

    public List<CommentDTO> getAllComment(String contentId){
        contentRepository.findById(contentId).orElseThrow(() ->  new CustomException(ErrorCode.CANNOT_FOUND_CONTENT));
        //
        List<CommentDTO> comments = commentRepository.findAllByContentId(contentId);

        comments.forEach(c -> {
            c.setProfileImg(userRepository.findByUsername(c.getUsername()).getProfileImg());
        });

        return comments;
    }

    public List<CommentUserDTO> getAllUserComment(String username){

        //todo: refactoring 필요
        List<CommentUserDTO> comments = commentRepository.findAllByUsername(username);
        for (CommentUserDTO comment : comments) {
            comment.setTitle(contentRepository.findById(comment.getContentId()).orElse(null).getTitle());
            comment.setProfileImg(userRepository.findByUsername(comment.getUsername()).getProfileImg());
        }


        return comments;
    }

    @Transactional
    public CommentDTO putComment(String id, CommentDTO commentDTO, String username){

        if(!username.equals(commentDTO.getUsername())){
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
                .username(comment.getUsername())
                .contentId(comment.getContentId())
                .createdDate(comment.getCreatedDate())
                .build();
    }

    @Transactional
    public Boolean deleteComment(String id, String username){

        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment!=null) {
            if (!comment.getUsername().equals(username)) throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);
            commentRepository.deleteById(id);
            Content content = contentRepository.findById(comment.getContentId()).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_CONTENT));

            // 게시글에서 댓글 삭제
            content.subCommentCount();
            contentRepository.save(content);

            return true;
        } else {
            throw new CustomException(ErrorCode.CANNOT_FOUND_COMMENT);
        }
    }

}
