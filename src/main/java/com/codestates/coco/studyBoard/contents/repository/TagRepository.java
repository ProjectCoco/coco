package com.codestates.coco.studyBoard.contents.repository;

import com.codestates.coco.studyBoard.contents.domain.Content;
import com.codestates.coco.studyBoard.contents.domain.ContentDTO;
import com.codestates.coco.studyBoard.contents.domain.Tag;
import com.codestates.coco.studyBoard.contents.domain.TagDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface TagRepository  extends MongoRepository<Tag, String> {
    Tag findByTagName(String tagName);
    Boolean existsByTagName(String tagName);

    @Query(sort = "{count:-1}")
    List<TagDTO> findBy(Pageable pageable);
}
