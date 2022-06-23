package com.codestates.coco.user.config;

import com.codestates.coco.user.jwt.JwtAuthenticationFilter;
import com.codestates.coco.user.jwt.JwtAuthorizationFilter;
import com.codestates.coco.user.jwt.JwtProperties;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    private final UserRepository userRepository;

    private final JwtProperties jwtProperties;

    @Override
    public void configure(WebSecurity web) throws Exception {
        // 정적자원 권한요청에서 제외
        web.ignoring().antMatchers("/static/**", "/favicon*");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(corsFilter) // 적용한 필터설정 추가
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtProperties)) // loginProcessingUrl을 사용하지 못하므로 대신 처리할 핕터 추가
                                                                                 // 로그인 시도 url은 /login
                                                                                 // AuthenticationManager를 WebSecurityConfigurerAdapter가 가지고 있다.
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository, jwtProperties))
                .authorizeRequests()
                .mvcMatchers("/").permitAll()
                .antMatchers("/api/user/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER')")
                .antMatchers("/api/manager/**")
                .access("hasRole('ROLE_MANAGER')")// 세션방식 x
                .antMatchers("/").hasAnyRole("ANONYMOUS");

    }


    // 세션로그인
/*    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/test/user/**").authenticated()
                .antMatchers("/test/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
                .antMatchers("/test/admin/**").access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .loginPage("/test/loginForm")
                .loginProcessingUrl("/test/login") // login 주소가 호출이되면 시큐리티가 처리. 즉 controller에 api 등록할 이유가 없다.
                .defaultSuccessUrl("/")
        ;

    }*/
}
