package com.codestates.coco;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
public class ReactController implements ErrorController {
    @RequestMapping({"/", "/error"})
    public String index(HttpServletResponse response) {
        // 페이지는 정상동작하지만 Network 탭에 404 Error로 표시되는 문제 해결
        response.setStatus(HttpStatus.OK.value());
        return "index.html";
    }
}