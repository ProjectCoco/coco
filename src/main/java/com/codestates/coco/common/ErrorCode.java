package com.codestates.coco.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 400 BAD_REQUEST : 잘못된 요청 */
    INVALID_FORM(HttpStatus.BAD_REQUEST,"필드 형식이 유효하지 않습니다."),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
/*    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 유효하지 않습니다."),
    MISMATCH_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "리프레시 토큰의 유저 정보가 일치하지 않습니다."),*/
    UNAUTHENTICATED(HttpStatus.UNAUTHORIZED, "로그인이 필요한 페이지입니다."),
    INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 유효하지 않습니다."),
    EXPIRED_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "토큰 유효기간이 만료되었습니다."),
    UNAUTHENTICATED_MEMBER(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다."),

    /* 403 FORBIDDEN : 권한 없는 사용자 */
    FORBIDDEN_MEMBER(HttpStatus.FORBIDDEN, "해당 페이지에 권한이 없습니다."),

    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    CANNOT_FOUND_CONTENT(HttpStatus.NOT_FOUND, "Content_ID를 찾을 수 없습니다."),
    CANNOT_FOUND_COMMENT(HttpStatus.NOT_FOUND, "Comment_ID를 찾을 수 없습니다."),
    CANNOT_FOUND_USER(HttpStatus.NOT_FOUND, "User_ID를 찾을 수 없습니다."),

    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다."),
    ;

    private final HttpStatus httpStatus;
    private final String detail;
}