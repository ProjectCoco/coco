package com.codestates.coco.user.config.security;

import com.codestates.coco.user.auth.exception.CustomAuthenticationEntryPoint;
import com.codestates.coco.user.auth.exception.CustomDeniedHandler;
import com.codestates.coco.user.auth.filter.JwtAuthenticationFilter;
import com.codestates.coco.user.auth.filter.JwtAuthorizationFilter;
import com.codestates.coco.user.auth.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.codestates.coco.user.auth.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.codestates.coco.user.auth.oauth.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.codestates.coco.user.auth.oauth.service.PrincipalOAuth2UserService;
import com.codestates.coco.user.auth.token.JwtProvider;
import com.codestates.coco.user.config.properties.AppProperties;
import com.codestates.coco.user.utils.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) // @Secured annotation 활성화 (즉 controller에서 권한설정을 할 수 있다.) <= 요즘사용
                                                                          // @preAuthorize annotation 활성화 (함수 전에 권한 설정) <= 예전사용
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CorsFilter corsFilter;
    private final JwtProvider jwtProvider;

    private final RedisUtil redisUtil;

    private final AppProperties appProperties;
    private final PrincipalOAuth2UserService oAuth2UserService;

    private final HttpCookieOAuth2AuthorizationRequestRepository authorizationRequestRepository;

    @Override
    public void configure(WebSecurity web) throws Exception {
        // 정적자원 권한요청에서 제외
        web.ignoring().antMatchers("/static/**", "/favicon.*", "/error");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .addFilter(corsFilter) // 적용한 필터설정 추가
                .formLogin().disable()
                .httpBasic().disable()// 로그인 시도 url은 /login// AuthenticationManager를 WebSecurityConfigurerAdapter가 가지고 있다.
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtProvider))
                .addFilterBefore(new JwtAuthorizationFilter(authenticationManager(), jwtProvider), JwtAuthenticationFilter.class)
                // 예외처리
                .exceptionHandling()
                .accessDeniedHandler(new CustomDeniedHandler())
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
            .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorization")
                .authorizationRequestRepository(authorizationRequestRepository)
                .and()
                .redirectionEndpoint()
                .baseUri("/*/oauth2/code/*")
                .and()
                .userInfoEndpoint()
                .userService(oAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler())
                .failureHandler(oAuth2AuthenticationFailureHandler())
            .and()
                // 권한설정
                .authorizeRequests()
                // 로그인 및 회원가입 로직에 포함된 권한 설정
                .antMatchers("/api/content/**").authenticated()
                .antMatchers("/api/comment/**").authenticated()
                .antMatchers("/api/userprofile/**").authenticated()
                .antMatchers("/api/userfavor/**").authenticated()
                .antMatchers("/api/token").authenticated()
                .anyRequest().permitAll();
    }

    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(appProperties, authorizationRequestRepository, jwtProvider);
    }

    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        return new OAuth2AuthenticationFailureHandler(authorizationRequestRepository);
    }
}
