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

}
