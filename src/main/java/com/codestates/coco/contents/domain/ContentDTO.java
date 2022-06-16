package com.codestates.coco.contents.domain;


import lombok.Data;
import javax.validation.constraints.NotBlank;

import java.util.Date;

@Data
public class ContentDTO {

    private String _id;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private Date createdDate;

    @NotBlank
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
