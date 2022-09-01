package com.codestates.coco.contents.controller;

import com.codestates.coco.studyBoard.contents.domain.ContentDTO;
import com.codestates.coco.studyBoard.contents.domain.Tag;
import com.codestates.coco.studyBoard.contents.domain.TagDTO;
import com.codestates.coco.studyBoard.contents.service.ContentService;
import com.codestates.coco.user.auth.domain.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;

    @GetMapping("")
    public ResponseEntity<Slice<ContentDTO>> getTitle(@RequestParam("page") int page, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return new ResponseEntity<>(contentService.getTitleContents(page, principalDetails.getUser().getUsername()), HttpStatus.OK);
    }

    //todo e
    @GetMapping("/{id}")
    public ResponseEntity<ContentDTO> detailContents(
            @PathVariable("id") String id,
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            HttpServletRequest request) {

        String ip = request.getHeader("X-Forwarded-For");
//        System.out.println("X-FORWARDED-FOR : " + ip);
//
//        if (ip == null) {
//            ip = request.getHeader("Proxy-Client-IP");
//        }
//        if (ip == null) {
//            ip = request.getHeader("WL-Proxy-Client-IP");
//        }
//        if (ip == null) {
//            ip = request.getHeader("HTTP_CLIENT_IP");
//        }
//        if (ip == null) {
//            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
//        }
        if (ip == null) {
            ip = request.getRemoteAddr();
        }
        System.out.println("Result : IP Address : "+ip);

        return new ResponseEntity<>(contentService.getContents(id, principalDetails.getUser().getUsername(), ip), HttpStatus.OK);
    }


    //todo auth
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteContents(@PathVariable("id") String id, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return new ResponseEntity<>(contentService.deleteContents(id, principalDetails.getUser().getUsername()), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> putContents(
            @PathVariable("id") String id,
            @Valid
            @RequestBody ContentDTO contentDTO,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return new ResponseEntity<>(contentService.putContents(id, contentDTO, principalDetails.getUser().getUsername()), HttpStatus.CREATED);
    }

    @PostMapping("")
    public ResponseEntity<ContentDTO> createContent(@Valid @RequestBody ContentDTO contentDTO) {
        return new ResponseEntity<>(contentService.createcontent(contentDTO), HttpStatus.CREATED);
    }

    @PostMapping("/{id}/favor/{username}")
    public ResponseEntity<Boolean> favorContent(@PathVariable String id, @PathVariable String username, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return new ResponseEntity<>(contentService.favor(id, principalDetails.getUser().getUsername()), HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}/favor/{username}")
    public ResponseEntity<Boolean> unFavorContent(@PathVariable String id, @PathVariable String username, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return new ResponseEntity<>(contentService.unfavor(id, principalDetails.getUser().getUsername()), HttpStatus.NO_CONTENT);
    }

    //todo tagLogic
    @GetMapping("/tag")
    public ResponseEntity<List<ContentDTO>> getContentsWithTag(@RequestParam("tag") String tag,
                                                               @RequestParam("page") int page,
                                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return new ResponseEntity<>(contentService.getContentsWithTag(tag, page, principalDetails.getUser().getUsername()), HttpStatus.OK);
    }

    @GetMapping("/tag/rank")
    public ResponseEntity<List<TagDTO>> getTagRank(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return new ResponseEntity<>(contentService.getTagRank(), HttpStatus.OK);
    }

}
