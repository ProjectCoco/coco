package com.codestates.coco.contents.service;


import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import com.codestates.coco.contents.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;


    public List<Content> getAllContents() {
        return contentRepository.findAll();
    }

    public Content createcontent(ContentDTO contentDTO) {
        Content content = contentRepository.save(contentDTO.toEntity());
        return content;
    }
}
