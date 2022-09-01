package com.codestates.coco.studyBoard.contents.domain;


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

    @Transient
    private Boolean commentState;

    //todo tagLogic
    private List<String> tag;

    //todo viewCount
    private Long viewCount;
    private List<String> userIpList;

    @Builder
    public Content(String _id, String title, String content, String username, Long favorCount, Long commentCount, List<String> tag, Long viewCount, List<String> userIpList) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.username = username;
        this.favorCount = favorCount;
        this.commentCount = commentCount;
        this.tag = tag;
        this.viewCount = viewCount;
        this.userIpList = userIpList;
    }

    /*@DocumentReference(lazy = true)
    private List<User> userFavor;*/

    /*public void addUserFavor(User user) { this.userFavor.add(user); }
    public void removeUserFavor(User user) { this.userFavor.remove(user); }*/

    public void update(String title, String content, List<String> tag) {
        this.title = title;
        this.content = content;
        this.tag = tag;
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

    public void addViewCount() {
        this.viewCount++;
    }

    public void addUserIpList(String userIp) {
        this.userIpList.add(userIp);
    }
}