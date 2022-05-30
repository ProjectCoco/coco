package com.codestates.coco.comment.domain;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
public class CommentDTO {

    private String _id;
    private String content_id; // 관련된 content_id
    private String comment; //commentBody
    private Date createdDate;
    private String author;

    @Builder
    public CommentDTO(String _id, String content_id, String comment, Date createdDate, String author) {
        this._id = _id;
        this.content_id = content_id;
        this.comment = comment;
        this.createdDate = createdDate;
        this.author = author;
    }

    public Comment toEntity(CommentDTO commentDTO) {
        return Comment.builder()
                ._id(commentDTO.get_id())
                .content_id(commentDTO.getContent_id())
                .comment(commentDTO.getComment())
                .createdDate(commentDTO.getCreatedDate())
                .author(commentDTO.getAuthor())
                .build();
    }
}
