package com.codestates.coco.comment.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document
public class Comment {

    @Id
    private String _id;
    private String contentId; // 관련된 content_id
    private String comment; //commentBody

    @CreatedDate
    private Date createdDate;
    private String author;

    @Builder
    public Comment(String _id, String contentId, String comment, Date createdDate, String author) {
        this._id = _id;
        this.contentId = contentId;
        this.comment = comment;
        this.createdDate = createdDate;
        this.author = author;
    }

    public void update(String comment) {
        this.comment = comment;
    }
}
