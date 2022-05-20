package com.codestates.coco.user.config;

import com.codestates.coco.user.jwt.JwtAccessDeniedHandler;
import com.codestates.coco.user.jwt.JwtAuthenticationEntryPoint;
import com.codestates.coco.user.jwt.JwtSecurityConfig;
import com.codestates.coco.user.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RequiredArgsConstructor
@EnableWebSecurity
//@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

//    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() { return new BCryptPasswordEncoder(); }
/*    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(new BCryptPasswordEncoder());
    }*/



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                //session 해제제
               .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
//                .antMatchers("/","/apitest/jwt", "/login", "/join", "/style/**", "/js/**", "/img/**")
                .anyRequest().permitAll()
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));


    }


}
