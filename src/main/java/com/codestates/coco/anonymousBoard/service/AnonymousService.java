package com.codestates.coco.anonymousBoard.service;


import com.codestates.coco.anonymousBoard.domain.*;
import com.codestates.coco.anonymousBoard.mapper.AnonymousMapper;
import com.codestates.coco.anonymousBoard.repository.AnonymousRepository;
import com.codestates.coco.studyBoard.contents.domain.ContentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnonymousService {

    private final AnonymousRepository anonymousRepository;
    private final AnonymousMapper mapper;

    //title(page)
    public Slice<AnonymousResDTO> getAllAnonymousTitles(int page) {

        Slice<AnonymousResDTO> AnonymousTitles = anonymousRepository.findBy(PageRequest.of(page, 10));

        return AnonymousTitles;
    }

    //get id
    public AnonymousResDTO getAnonymousTitle(String boardId) {
        Anonymous anonymousBoard = anonymousRepository.findById(boardId).orElse(null);;
        
        return mapper.anonymousToAnonymousResDTO(anonymousBoard);
    }

    //post
    public AnonymousResDTO postAnonymous(AnonymousReqDTO anonymousBoard) {

        Anonymous anonymous = mapper.anonymousReqDTOToAnonymous(anonymousBoard);

        return mapper.anonymousToAnonymousResDTO(anonymousRepository.save(anonymous));
    }

    //delete
    public void deleteAnonymous(String boardId) {
        anonymousRepository.deleteById(boardId);
    }

    //put
    public AnonymousResDTO putAnonymous(String boardId, AnonymousReqDTO anonymousBoard) {

        Anonymous anonymous = anonymousRepository.findById(boardId).orElseThrow(()-> new RuntimeException("에러"));
        anonymous.setTitle(anonymousBoard.getTitle());
        anonymous.setContent(anonymousBoard.getContent());

        return  mapper.anonymousToAnonymousResDTO(anonymousRepository.save(anonymous));
    }

    public void postCommentAnonymous(String boardId, AnonComment anonComment) {
        Anonymous anonymous = anonymousRepository.findById(boardId).orElseThrow(()->new RuntimeException("에러"));
//        List<AnonComment> = anonymous.getComments();

        return;
    }
}