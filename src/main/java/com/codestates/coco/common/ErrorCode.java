package com.codestates.coco.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 400 BAD_REQUEST : 잘못된 요청 */
    INVALID_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "리프레시 토큰이 유효하지 않습니다."),
    MISMATCH_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "리프레시 토큰의 유저 정보가 일치하지 않습니다."),
    INVALID_COMMENT_FORM(HttpStatus.BAD_REQUEST, "Comment 형식이 유효하지 않습니다."),
    INVALID_CONTENT_FORM(HttpStatus.BAD_REQUEST,"Content 형식이 유효하지 않습니다."),
    INVALID_USER_FORM(HttpStatus.BAD_REQUEST, "USER 형식이 유효하지 않습니다."),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "권한 정보가 없는 토큰입니다."),
    UNAUTHORIZED_MEMBER(HttpStatus.UNAUTHORIZED, "현재 내 계정 정보가 존재하지 않습니다."),

    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    CANNOT_FOUND_CONTENT(HttpStatus.NOT_FOUND, "Content_ID를 찾을 수 없습니다."),
    CANNOT_FOUND_COMMENT(HttpStatus.NOT_FOUND, "Comment_ID를 찾을 수 없습니다."),


    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다."),

    ;

    private final HttpStatus httpStatus;
    private final String detail;
}