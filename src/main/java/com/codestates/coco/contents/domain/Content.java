package com.codestates.coco.contents.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@Document()
public class Content {

    @Id
    private String _id;
    private String title;
    private String content; //contentBody
    
    // Auditing 추가
    @CreatedDate
    private LocalDateTime createdDate;
    private String username;
    private Long favorCount;

    /*@DocumentReference(lazy = true)
    private List<User> userFavor;*/

    /*public void addUserFavor(User user) { this.userFavor.add(user); }
    public void removeUserFavor(User user) { this.userFavor.remove(user); }*/

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void addCount() {
        this.favorCount++;
    }

    public void subCount() {
        this.favorCount--;
    }
}
