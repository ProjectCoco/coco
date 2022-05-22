package com.codestates.coco.contents.service;


import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import com.codestates.coco.contents.domain.ContentGetDTO;
import com.codestates.coco.contents.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;


    public List<ContentGetDTO> getAllContents() {
        List<ContentGetDTO> all = contentRepository.findAll().stream()
                .map(s ->
                ContentGetDTO.builder()
                        .content(s.getContent())
                        ._id(s.get_id())
                        .dateTime(s.getDateTime())
                        .subject(s.getSubject())
                        .favor(s.getFavor())
                        .build()
        ).collect(Collectors.toList());
        return all;

    }

    public ContentGetDTO getContents(String id) {
        Optional<Content> content = contentRepository.findById(id);
        ContentGetDTO returnContent = new ContentGetDTO(
                content.get().get_id(),
                content.get().getSubject(),
                content.get().getContent(),
                content.get().getDateTime(),
                content.get().getFavor()
                );

        return returnContent;
    }

    public Content createcontent(ContentDTO contentDTO) {
        return contentRepository.save(contentDTO.toEntity());
    }
}
