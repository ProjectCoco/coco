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

    @NotBlank
    private String comment; //commentBody

    private LocalDateTime createdDate;

    @NotBlank
    private String author;

    /*@Builder
    public CommentDTO(String contentId, String comment, String author) {
        this.contentId = contentId;
        this.comment = comment;
        this.author = author;
    }*/

    public Comment toEntity(CommentDTO commentDTO) {
        return Comment.builder()
                ._id(commentDTO.get_id())
                .contentId(commentDTO.getContentId())
                .comment(commentDTO.getComment())
                .author(commentDTO.getAuthor())
                .build();
    }
}
