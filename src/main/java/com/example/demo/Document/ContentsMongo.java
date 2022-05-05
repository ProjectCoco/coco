package com.example.demo.Document;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Getter
@Document("content")
public class ContentsMongo {
    @Id
    private Long id;
    private String title;
    private String message;

}
