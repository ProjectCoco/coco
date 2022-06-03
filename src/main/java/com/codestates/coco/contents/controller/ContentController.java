package com.codestates.coco.contents.controller;


import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import com.codestates.coco.contents.domain.ContentGetDTO;
import com.codestates.coco.contents.domain.ContentTitleDTO;
import com.codestates.coco.contents.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/contents")
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;


    @GetMapping("/page/{page}")
    public List<ContentTitleDTO> getTitle(@PathVariable("page") int page) {
        return contentService.getTitleContents(page);
    }

    @GetMapping("")
    public List<ContentGetDTO> getContents() {
        return contentService.getAllContents();
    }

    //todo e
    @GetMapping("/{id}")
    public ContentGetDTO detailContents(@PathVariable("id") String id) {
        return contentService.getContents(id);
    }


    //todo auth
    @DeleteMapping("/{id}")
    public boolean deleteContents(@PathVariable("id") String id) {
        return contentService.deleteContents(id);
    }

    @PutMapping("/{id}")
    public boolean putContents(
            @PathVariable("id") String id,
            @RequestBody ContentDTO contentDTO) {
        return contentService.putContents(id, contentDTO);
    }


    @PostMapping("")
    public ResponseEntity<Content> createContent(@RequestBody ContentDTO contentDTO) {
        return new ResponseEntity<>(contentService.createcontent(contentDTO), HttpStatus.OK);
    }
}
