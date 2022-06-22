package com.codestates.coco.comment.repository;

import com.codestates.coco.comment.domain.Comment;
import com.codestates.coco.comment.domain.CommentDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {

    List<CommentDTO> findAllByContentId(String contentId);

}
