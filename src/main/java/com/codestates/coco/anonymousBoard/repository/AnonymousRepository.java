package com.codestates.coco.anonymousBoard.repository;

import com.codestates.coco.anonymousBoard.domain.Anonymous;
import com.codestates.coco.anonymousBoard.domain.AnonymousResDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnonymousRepository extends MongoRepository<Anonymous, String> {

    @Query(sort = "{_id:-1}")
    Slice<AnonymousResDTO> findBy(Pageable pageable);
}
