package com.codestates.coco.studyBoard.comment.repository;

import com.codestates.coco.studyBoard.comment.domain.Comment;
import com.codestates.coco.studyBoard.comment.domain.CommentDTO;
import com.codestates.coco.studyBoard.comment.domain.CommentUserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String>{

    List<CommentDTO> findAllByContentId(String contentId);

    List<CommentUserDTO> findAllByUsername(String username);

    Boolean existsByUsernameAndContentId(String username, String contentId);

    @Query("{'username' : ?0}")
    List<Comment> findAllByUser(String username);

}
