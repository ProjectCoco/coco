package com.codestates.coco.studyBoard.contents.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document()
public class Tag {
    @Id
    private String _id;

    private String tagName;

    private Long count;


    @Builder
    public Tag(String tagName, Long count) {
        this.tagName = tagName;
        this.count = count;
    }

    public Tag addCount() {
        this.count++;
        return this;
    }
}
