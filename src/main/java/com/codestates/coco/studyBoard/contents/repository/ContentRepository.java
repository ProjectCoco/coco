package com.codestates.coco.studyBoard.contents.repository;

import com.codestates.coco.studyBoard.contents.domain.Content;
import com.codestates.coco.studyBoard.contents.domain.ContentDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ContentRepository extends MongoRepository<Content, String> {
    @Query(sort = "{_id:-1}")
    Slice<ContentDTO> findBy(Pageable pageable); // paging된 List의 메타데이터를 출력하기 위해 slice 또는 page 인터페이스로 반환

    List<Content> findAllByUsername(String username);

    List<ContentDTO> findAllBy();

    //todo taglogic
    @Query(value = "{tag: { $elemMatch: { $eq: ?0 } }}")
    List<ContentDTO> findByTag(String tag, Pageable pageable);


}
