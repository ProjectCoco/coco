package com.codestates.coco.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // 서버응답 시 json을 자바스크립트에서 처리할 수 있게
        config.addAllowedOrigin("*"); // 모든 ip의 응답 허용
        config.addAllowedHeader("*"); // 모든 헤더의 응답을 허용
        config.addAllowedMethod("*"); // 모든 get post put delete patch 요청 허용

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
