package com.codestates.coco.contents.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentDTO {

    private String _id;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String author;

    private LocalDateTime createdDate;

    private Long favor;


    // 생성자 -> 빌더패턴으로 객체 생성 전략 변경
    public Content toEntity() {
        return Content.builder()
                ._id(_id)
                .title(title)
                .content(content)
                .author(author)
                .favor(favor)
                .build();
    }
}
