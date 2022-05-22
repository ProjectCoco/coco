package com.codestates.coco.contents.domain;


import lombok.Data;

import java.util.Date;

@Data
public class ContentDTO {

    private String _id;
    private String subject;
    private String content;
    private Date dateTime;
    private String author;
    private Long favor;


    public Content toEntity() {
        Content content = new Content();
        content.set_id(_id);
        content.setSubject(subject);
        content.setContent(this.content);
        content.setDateTime(dateTime);
        content.setAuthor(author);
        content.setFavor(favor);
        return content;
    }
}
