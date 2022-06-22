package com.codestates.coco.contents.service;


import com.codestates.coco.common.CustomException;
import com.codestates.coco.common.ErrorCode;
import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import com.codestates.coco.contents.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;


    public List<ContentDTO> getTitleContents(int page) {
        return contentRepository.findBy(PageRequest.of(page, 10));
    }

    /* 더이상 사용하지 않는 전체 조회코드
    public List<ContentDTO> getAllContents() {
        return contentRepository.findAllBy();
    }
    */

    public ContentDTO getContents(String id){
        try {
            Content content = contentRepository.findById(id).orElse(null);
            return ContentDTO.builder()
                    ._id(content.get_id())
                    .title(content.getTitle())
                    .content(content.getContent())
                    .createdDate(content.getCreatedDate())
                    .favor(content.getFavor())
                    .build();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.CANNOT_FOUND_CONTENT);
        }
    }


    //todo auth
    public boolean deleteContents(String id) {

        if (contentRepository.existsById(id)) {
            contentRepository.deleteById(id);
            return true;
        } else {
            throw new CustomException(ErrorCode.CANNOT_FOUND_CONTENT);
        }
    }


    public boolean putContents(String id, ContentDTO contentDTO) {

        Content content = contentRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_CONTENT));

        content.update(contentDTO.getTitle(), contentDTO.getContent());
        contentRepository.save(content);

        return true;

            /*  아래와 같이 작성하는 경우, Controller에서 받아온 title, content 등을 제외한 나머지 favor, author 등은 삭제된 채 업데이트된다.
                Content content = contentDTO.toEntity();
                content.set_id(id);
                contentRepository.save(content);
            */

    }


    public Content createcontent(ContentDTO contentDTO) {
        return contentRepository.save(contentDTO.toEntity());
    }
}
