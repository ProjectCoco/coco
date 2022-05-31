package com.codestates.coco.user.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class User {

    @Id
    private String id;
    private String email;
    private String password;
    private String username;
    private String codeNum;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
