package com.codestates.coco.user.repository;

import com.codestates.coco.user.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
    User findByUsername(String username);
}
