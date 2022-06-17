package com.codestates.coco.contents.controller;


import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import com.codestates.coco.contents.domain.ContentGetDTO;
import com.codestates.coco.contents.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/content")
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;


    @GetMapping("")
    public ResponseEntity<List<ContentGetDTO>> getTitle(@RequestParam("page") int page) {
        return new ResponseEntity<>(contentService.getTitleContents(page), HttpStatus.OK);
    }

    //todo e
    @GetMapping("/{id}")
    public ResponseEntity<ContentGetDTO> detailContents(@PathVariable("id") String id) {
        return new ResponseEntity<>(contentService.getContents(id), HttpStatus.OK);
    }


    //todo auth
    @Secured("ROLE_USER")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteContents(@PathVariable("id") String id) {
        return new ResponseEntity<>(contentService.deleteContents(id), HttpStatus.NO_CONTENT);
    }

    @Secured("ROLE_USER")
    @PutMapping("/{id}")
    public ResponseEntity<Boolean> putContents(
            @PathVariable("id") String id,
            @Valid
            @RequestBody ContentDTO contentDTO, BindingResult bindingResult) {
        return new ResponseEntity<>(contentService.putContents(id, contentDTO), HttpStatus.CREATED);
    }

    @Secured("ROLE_USER")
    @PostMapping("")
    public ResponseEntity<Content> createContent(@Valid @RequestBody ContentDTO contentDTO, BindingResult bindingResult) {
        return new ResponseEntity<>(contentService.createcontent(contentDTO), HttpStatus.CREATED);
    }
}
