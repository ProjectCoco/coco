package com.example.demo.controller;

import com.example.demo.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class DemoController {
    private final ContentService contentService;

    @GetMapping("/dbcall")
    public String demo() {
        contentService.mongoInsert();
        return "test";
    }
}
