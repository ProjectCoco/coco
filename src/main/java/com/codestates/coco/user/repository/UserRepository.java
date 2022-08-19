package com.codestates.coco.user.repository;

import com.codestates.coco.user.domain.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
    User findByUsername(String username);
    User findByProviderId(String providerId);

    @Query(value = "{ 'username' : ?0 , 'contentFavor' : ?1}", exists = true)
    Boolean existsByContentFavor(String username, ObjectId contentId);

    Boolean existsByUsernameAndContentFavor(String username, ObjectId contentfavor);


}
