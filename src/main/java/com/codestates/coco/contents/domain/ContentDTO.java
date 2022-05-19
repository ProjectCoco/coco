package com.codestates.coco.contents.domain;


import lombok.Data;

@Data
public class ContentDTO {

    private String title;
    private String email;
    private String contentBody;

    public Content toEntity() {
        Content content = new Content();
        content.setTitle(title);
        content.setContentBody(contentBody);
        content.setEmail(email);
        return content;
    }
}
