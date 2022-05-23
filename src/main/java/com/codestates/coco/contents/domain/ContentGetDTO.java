package com.codestates.coco.contents.domain;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ContentGetDTO {

    private String _id;
    private String subject;
    private String content;
    private Date dateTime;
    private Long favor;

    public ContentGetDTO(String _id, String subject, String content, Date dateTime, Long favor) {
        super();
        this._id = _id;
        this.subject = subject;
        this.content = content;
        this.dateTime = dateTime;
        this.favor = favor;
    }
}
