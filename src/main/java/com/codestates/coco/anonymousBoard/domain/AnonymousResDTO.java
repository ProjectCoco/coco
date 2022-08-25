package com.codestates.coco.anonymousBoard.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class AnonymousResDTO {

    private String _id;
    private String title;
    private String content;
    private List<AnonComment> comments;

}
