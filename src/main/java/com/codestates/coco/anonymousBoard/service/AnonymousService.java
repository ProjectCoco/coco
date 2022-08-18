package com.codestates.coco.anonymousBoard.service;


import com.codestates.coco.anonymousBoard.domain.Anonymous;
import com.codestates.coco.anonymousBoard.domain.AnonymousDTO;
import com.codestates.coco.anonymousBoard.mapper.AnonymousMapper;
import com.codestates.coco.anonymousBoard.repository.AnonymousRepository;
import com.codestates.coco.studyBoard.contents.domain.ContentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnonymousService {

    private final AnonymousRepository anonymousRepository;
    private final AnonymousMapper anonymousMapper;

    //title(page)
    public Slice<AnonymousDTO> getAllAnonymousTitles(int page) {

        Slice<AnonymousDTO> AnonymousTitles = anonymousRepository.findBy(PageRequest.of(page, 10));

        return AnonymousTitles;
    }

    //get id
    public AnonymousDTO getAnonymousTitle(String boardId) {
        Anonymous anonymousBoard = anonymousRepository.findById(boardId).orElse(null);;
        
        return new AnonymousDTO();
    }

    //post
    public AnonymousDTO postAnonymous(AnonymousDTO anonymousBoard) {

        Anonymous anonymous = anonymousMapper.anonymousDTOToAnonymous(anonymousBoard);

        anonymousRepository.save(anonymous);
        return anonymousBoard;
    }

    //delete
    public void deleteAnonymous(String boardId) {
        anonymousRepository.deleteById(boardId);
    }

    //put
    public AnonymousDTO putAnonymous(String boardId, AnonymousDTO anonymousBoard) {
        return anonymousBoard;
    }
}
