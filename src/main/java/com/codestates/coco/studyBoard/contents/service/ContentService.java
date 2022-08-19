package com.codestates.coco.studyBoard.contents.service;


import com.codestates.coco.studyBoard.comment.repository.CommentRepository;
import com.codestates.coco.common.CustomException;
import com.codestates.coco.common.ErrorCode;
import com.codestates.coco.studyBoard.contents.domain.Content;
import com.codestates.coco.studyBoard.contents.domain.ContentDTO;
import com.codestates.coco.studyBoard.contents.repository.ContentRepository;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    //todo
    public Slice<ContentDTO> getTitleContents(int page, String username) {
        Slice<ContentDTO> contents = contentRepository.findBy(PageRequest.of(page, 10));
//        contents.forEach(content -> content.setFavorState(userRepository.existsByContentFavor(username, new ObjectId(content.get_id()))));
        contents.forEach(content -> {
            content.setFavorState(userRepository.existsByUsernameAndContentFavor(username, new ObjectId(content.get_id())));
            content.setCommentState(commentRepository.existsByUsernameAndContentId(username, content.get_id()));
            content.setProfileImg(userRepository.findByUsername(content.getUsername()).getProfileImg()); // content에 등록된 username에 대하여 profileImg 획득
        });
        return contents;
    }

    /* 더이상 사용하지 않는 전체 조회코드
    public List<ContentDTO> getAllContents() {
        return contentRepository.findAllBy();
    }
    */

    public ContentDTO getContents(String id, String username, String userIp){

        LocalDate now = LocalDate.now();
        //todo  ip 암호화
        String userIpSecu = null;
        try {
            userIpSecu = Encryption.SHA256(userIp+now);
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            Content content = contentRepository.findById(id).orElse(null);

            if(!content.getUserIpList().contains(userIpSecu)) {
                content.addViewCount();
                content.addUserIpList(userIpSecu);
                contentRepository.save(content);
            }
            System.out.println(userIpSecu);
            System.out.println(content.getUserIpList());

            return ContentDTO.builder()
                    ._id(content.get_id())
                    .title(content.getTitle())
                    .content(content.getContent())
                    .username(content.getUsername())
                    .createdDate(content.getCreatedDate())
                    .favorCount(content.getFavorCount())
                    .commentCount(content.getCommentCount())
                    .favorState(userRepository.existsByUsernameAndContentFavor(username, new ObjectId(content.get_id())))
                    .commentState(commentRepository.existsByUsernameAndContentId(username, content.get_id()))
                    .tag(content.getTag())
                    .viewCount(content.getViewCount())
                    .profileImg(userRepository.findByUsername(content.getUsername()).getProfileImg()) // content에 등록된 username에 대하여 profileImg 획득
                    .build();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.CANNOT_FOUND_CONTENT);
        }
    }


    //todo auth
    public boolean deleteContents(String id, String username) {
        Content content = contentRepository.findById(id).orElse(null);
        if (content != null) {
            if (!content.getUsername().equals(username)) throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);
            contentRepository.deleteById(id);
            return true;
        } else {
            throw new CustomException(ErrorCode.CANNOT_FOUND_CONTENT);
        }
    }


    public boolean putContents(String id, ContentDTO contentDTO, String username) {

        Content content = contentRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_CONTENT));

        if (!content.getUsername().equals(username)) throw new CustomException(ErrorCode.FORBIDDEN_MEMBER);

        content.update(contentDTO.getTitle(), contentDTO.getContent(), contentDTO.getTag());
        contentRepository.save(content);

        return true;

            /*  아래와 같이 작성하는 경우, Controller에서 받아온 title, content 등을 제외한 나머지 favor, author 등은 삭제된 채 업데이트된다.
                Content content = contentDTO.toEntity();
                content.set_id(id);
                contentRepository.save(content);
            */

    }


    public ContentDTO createcontent(ContentDTO contentDTO) {
        contentDTO.setFavorCount(0L);
        contentDTO.setCommentCount(0L);
        contentDTO.setViewCount(0L);
        Content content = contentRepository.save(contentDTO.toEntity());
        return ContentDTO.builder()
                ._id(content.get_id())
                .title(content.getTitle())
                .content(content.getContent())
                .username(content.getUsername())
                .createdDate(content.getCreatedDate())
                .favorCount(content.getFavorCount())
                .commentCount(content.getCommentCount())
                .tag(content.getTag())
                .build();
    }

    public Boolean favor(String contentId, String username) {
        Content content = contentRepository.findById(contentId).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_CONTENT));
        User user = userRepository.findByUsername(username);
        user.addContentFavor(content);
        content.addCount();

        contentRepository.save(content);
        userRepository.save(user);
        return true;
    }

    public Boolean unfavor(String contentId, String username) {
        Content content = contentRepository.findById(contentId).orElseThrow(() -> new CustomException(ErrorCode.CANNOT_FOUND_CONTENT));
        User user = userRepository.findByUsername(username);
        user.removeContentFavor(content);
        content.subCount();

        contentRepository.save(content);
        userRepository.save(user);

        return true;
    }


    //todo taglogic
    public List<ContentDTO> getContentsWithTag(String tag, int page, String username) {

        List<ContentDTO> contents = contentRepository.findByTag(tag, PageRequest.of(page, 10));
        contents.forEach(content -> content.setFavorState(userRepository.existsByUsernameAndContentFavor(username, new ObjectId(content.get_id()))));
        return contents;
    }

}
