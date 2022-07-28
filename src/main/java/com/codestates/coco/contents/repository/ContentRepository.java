package com.codestates.coco.contents.repository;

import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ContentRepository extends MongoRepository<Content, String> {
    @Query(sort = "{_id:-1}")
    List<ContentDTO> findBy(Pageable pageable);

    List<Content> findAllByUsername(String username);

    List<ContentDTO> findAllBy();

    //todo taglogic
    @Query(value = "{tag: { $elemMatch: { $eq: ?0 } }}")
    List<ContentDTO> findByTag(String tag, Pageable pageable);


}
