package com.codestates.coco.contents.controller;


import com.codestates.coco.contents.domain.Content;
import com.codestates.coco.contents.domain.ContentDTO;
import com.codestates.coco.contents.service.ContentService;
import lombok.RequiredArgsConstructor;
//import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;


    @GetMapping("/contents")
    public List<Content> getcontents() {
        return contentService.getAllContents();
    }

    @PostMapping("/contents")
    public ResponseEntity<Content> createcontent(@RequestBody ContentDTO contentDTO) {
        return new ResponseEntity<Content>(contentService.createcontent(contentDTO), HttpStatus.OK);
    }
}
