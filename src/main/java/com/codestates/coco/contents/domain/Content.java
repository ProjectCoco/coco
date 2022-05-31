package com.codestates.coco.contents.domain;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document()
public class Content {

    @Id
    private String _id;
    private String title;
    private String content; //contentBody
    private Date createdDate;
    private String author;
    private Long favor;


}
