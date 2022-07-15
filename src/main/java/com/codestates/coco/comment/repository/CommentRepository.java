package com.codestates.coco.comment.repository;

import com.codestates.coco.comment.domain.Comment;
import com.codestates.coco.comment.domain.CommentDTO;
import com.codestates.coco.comment.domain.CommentUserDTO;
import com.codestates.coco.contents.domain.Content;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String>{

    List<CommentDTO> findAllByContentId(String contentId);

    List<CommentUserDTO> findAllByUsername(String username);

    @Query("{'username' : ?0}")
    List<Comment> findAllByUser(String username);

}
