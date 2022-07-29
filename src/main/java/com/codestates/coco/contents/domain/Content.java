package com.codestates.coco.contents.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

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
    private Long commentCount;

    @Transient
    private Boolean favorState;

    //todo tagLogic
    private List<String> tag;

    @Builder
    public Content(String _id, String title, String content, String username, Long favorCount, Long commentCount, List<String> tag) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.username = username;
        this.favorCount = favorCount;
        this.commentCount = commentCount;
        this.tag = tag;
    }

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

    public void addCommentCount(){
        this.commentCount++;
    }

    public void subCommentCount(){
        this.commentCount--;
    }

}
