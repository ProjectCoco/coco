package com.codestates.coco.contents.repository;

import com.codestates.coco.contents.domain.Content;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContentRepository extends MongoRepository<Content, String> {
}
