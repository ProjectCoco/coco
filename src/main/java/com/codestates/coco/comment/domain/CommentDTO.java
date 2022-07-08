package com.codestates.coco.comment.domain;

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
public class CommentDTO {

    private String _id;

    private String contentId; // 관련된 content_id

    @NotBlank(message = "댓글 내용은 공백일 수 없습니다.")
    private String comment; //commentBody

    private LocalDateTime createdDate;

    @NotBlank(message = "게시자는 공백일 수 없습니다.")
    private String username;

    public Comment toEntity(CommentDTO commentDTO) {
        return Comment.builder()
                ._id(commentDTO.get_id())
                .contentId(commentDTO.getContentId())
                .comment(commentDTO.getComment())
                .username(commentDTO.getUsername())
                .build();
    }
}
