package com.codestates.coco.contents.domain;

import lombok.Builder;
import lombok.Data;
import javax.validation.constraints.NotBlank;

import java.util.Date;

@Data
@Builder
public class ContentTitleDTO {

    private String _id;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private Date createdDate;

    private Long favor;

    public ContentTitleDTO(String _id, String title, String content, Date createdDate, Long favor) {
        super();
        this._id = _id;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
        this.favor = favor;
    }
}
