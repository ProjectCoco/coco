package com.codestates.coco.comment.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Comment {

    @Id
    private String _id;
    private String contentId; // 관련된 content_id
    private String comment; //commentBody

    @CreatedDate
    private LocalDateTime createdDate;
    private String username;

    @Builder
    public Comment(String _id, String contentId, String comment, LocalDateTime createdDate, String username) {
        this._id = _id;
        this.contentId = contentId;
        this.comment = comment;
        this.createdDate = createdDate;
        this.username = username;
    }

    public void update(String comment) {
        this.comment = comment;
    }
}
