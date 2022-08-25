package com.codestates.coco.anonymousBoard.controller;


import com.codestates.coco.anonymousBoard.domain.AnonComment;
import com.codestates.coco.anonymousBoard.domain.AnonymousReqDTO;
import com.codestates.coco.anonymousBoard.domain.AnonymousResDTO;
import com.codestates.coco.anonymousBoard.service.AnonymousService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Sinks;

@RestController
@RequestMapping("/api/anonymous")
@RequiredArgsConstructor
public class AnonymousController {

    private final AnonymousService anonymousService;

    @GetMapping("")
    public ResponseEntity<Slice<AnonymousResDTO>> getAllAnonymousTitles(@RequestParam int page) {

        return new ResponseEntity<>(anonymousService.getAllAnonymousTitles(page), HttpStatus.OK);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<AnonymousResDTO> getAnonymous(@PathVariable String boardId) {

        return new ResponseEntity<>(anonymousService.getAnonymousTitle(boardId), HttpStatus.OK);
    }


    @PostMapping("")
    public ResponseEntity<AnonymousResDTO> postAnonymous(@RequestBody AnonymousReqDTO anonymousBoard) {

        return new ResponseEntity<>(anonymousService.postAnonymous(anonymousBoard), HttpStatus.CREATED);
    }

    @PostMapping("/{boardId}")
    public void postCommentAnonymous(@PathVariable String boardId,
                                               @RequestBody AnonComment anonComment){
        return;
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<AnonymousResDTO> putAnonymous(
            @PathVariable String boardId,
            @RequestBody AnonymousReqDTO anonymousBoard
    ) {
        return new ResponseEntity<>(anonymousService.putAnonymous(boardId, anonymousBoard), HttpStatus.CREATED);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteAnonymousTitle(@PathVariable String boardId) {
        anonymousService.deleteAnonymous(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
