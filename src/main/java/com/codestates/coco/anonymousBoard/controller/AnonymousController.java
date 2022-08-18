package com.codestates.coco.anonymousBoard.controller;


import com.codestates.coco.anonymousBoard.domain.AnonymousDTO;
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
    public ResponseEntity<Slice<AnonymousDTO>> getAllAnonymousTitles(@RequestParam int page) {

        return new ResponseEntity<>(anonymousService.getAllAnonymousTitles(page), HttpStatus.OK);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<Object> getAnonymous(@PathVariable String boardId) {

        return new ResponseEntity<>(anonymousService.getAnonymousTitle(boardId), HttpStatus.OK);
    }


    @PostMapping("")
    public ResponseEntity<Object> postAnonymous(@RequestBody AnonymousDTO anonymousBoard) {

        return new ResponseEntity<>(anonymousService.postAnonymous(anonymousBoard), HttpStatus.CREATED);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<Object> putAnonymous(
            @PathVariable String boardId,
            @RequestBody AnonymousDTO anonymousBoard
    ) {
        return new ResponseEntity<>(anonymousService.putAnonymous(boardId, anonymousBoard), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnonymousTitle(@PathVariable String boardId) {
        anonymousService.deleteAnonymous(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
