package com.codestates.coco.contents.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentDTO {

    private String _id;

    @NotBlank(message = "제목은 공백일 수 없습니다.")
    private String title;

    @NotBlank(message = "게시글 내용은 공백일 수 없습니다.")
    private String content;

    @NotBlank(message = "게시자는 공백일 수 없습니다.")
    private String username;

    private LocalDateTime createdDate;

    private Long favorCount;

    private Long commentCount;

    private Boolean favorState;

    private Boolean commentState;

    private List<String> tag;

    private Long viewCount;

    private String profileImg;

    // 생성자 -> 빌더패턴으로 객체 생성 전략 변경
    public Content toEntity() {
        Content build = Content.builder()
                ._id(_id)
                .title(title)
                .content(content)
                .username(username)
                .favorCount(favorCount)
                .commentCount(commentCount)
                .tag(tag)
                .userIpList(new ArrayList<String>())
                .viewCount(viewCount)
                .build();
        return build;
    }
}