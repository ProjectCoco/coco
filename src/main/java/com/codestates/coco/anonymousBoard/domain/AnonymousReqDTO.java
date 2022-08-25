package com.codestates.coco.anonymousBoard.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class AnonymousReqDTO {

    private String title;
    private String content;
    private List<AnonComment> comments;


}
