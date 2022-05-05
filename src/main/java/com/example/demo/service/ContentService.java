package com.example.demo.service;

import com.example.demo.Document.ContentsMongo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ContentService {
    private final MongoTemplate mongoTemplate;

    public void mongoInsert(){
        ContentsMongo contentsMongo = new ContentsMongo(1L,"제목","메시지");
        mongoTemplate.insert(contentsMongo);
    }
}
