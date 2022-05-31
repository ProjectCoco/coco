package com.codestates.coco.contents.domain;


import lombok.Data;

import java.util.Date;

@Data
public class ContentDTO {

    private String _id;
    private String title;
    private String content;
    private Date createdDate;
    private String author;
    private Long favor;


    public Content toEntity() {
        Content content = new Content();
        content.set_id(_id);
        content.setTitle(title);
        content.setContent(this.content);
        content.setCreatedDate(createdDate);
        content.setAuthor(author);
        content.setFavor(favor);
        return content;
    }
}
