package com.codestates.coco.contents.service;


import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import com.codestates.coco.contents.domain.ContentGetDTO;
import com.codestates.coco.contents.domain.ContentTitleDTO;
import com.codestates.coco.contents.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;


    public List<ContentGetDTO> getTitleContents(int page) {
        return contentRepository.findBy(PageRequest.of(page,10));
    }

    public List<ContentGetDTO> getAllContents() {
        List<ContentGetDTO> all = contentRepository.findAll().stream()
                .map(s ->
                ContentGetDTO.builder()
                        .content(s.getContent())
                        ._id(s.get_id())
                        .createdDate(s.getCreatedDate())
                        .title(s.getTitle())
                        .favor(s.getFavor())
                        .build()
        ).collect(Collectors.toList());
        return all;

    }

    public ContentGetDTO getContents(String id) {
        try {
            Optional<Content> content = contentRepository.findById(id);
            ContentGetDTO returnContent = new ContentGetDTO(
                    content.get().get_id(),
                    content.get().getTitle(),
                    content.get().getContent(),
                    content.get().getCreatedDate(),
                    content.get().getFavor()
            );
            return returnContent;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"ContentId_Not_Found");
        }
    }


    //todo auth
    public boolean deleteContents(String id) {
        try {
            if (contentRepository.existsById(id)) {
                contentRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"ContentId_BAD_REQUEST");
        }
    }


    public boolean putContents(String id, ContentDTO contentDTO) {
        try {
            if(contentRepository.existsById(id)) {
                Content content = contentDTO.toEntity();
                content.set_id(id);
                contentRepository.save(content);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"ContentId_Or_ContentBody_BAD_REQUEST");
        }

    }



    public Content createcontent(ContentDTO contentDTO) {
        contentDTO.setCreatedDate(new Date());
        return contentRepository.save(contentDTO.toEntity());
    }
}
