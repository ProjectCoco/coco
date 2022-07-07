package com.codestates.coco.contents.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<String> userFavor;

    public Boolean getFavorState(String userId) {
        return userFavor.contains(userId);
    }

    public void addUserFavor(String userId) { this.userFavor.add(userId); }

    public void removeUserFavor(String userId) { this.userFavor.remove(userId); }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
