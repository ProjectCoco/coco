package com.codestates.coco.contents.service;


import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import com.codestates.coco.contents.domain.ContentGetDTO;
import com.codestates.coco.contents.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;


    public List<ContentGetDTO> getAllContents() {
        List<Content> all = contentRepository.findAll();

        return all.stream().map(s -> {
            return ContentGetDTO.builder()
                    .content(s.getContent())
                    ._id(s.get_id())
                    .dateTime(s.getDateTime())
                    .subject(s.getSubject())
                    .favor(s.getFavor())
                    .build();
        }).collect(Collectors.toList());

    }

    public Content createcontent(ContentDTO contentDTO) {
        return contentRepository.save(contentDTO.toEntity());
    }
}
