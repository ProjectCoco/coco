package com.codestates.coco.user.config.auth;

import com.codestates.coco.user.domain.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

// /loginForm 즉, SecurityConfig에 정의한 loginProcessingUrl 을 낚아채서 로그인 진행
// 로그인 진행완료 시 시큐리티 session을 만든다. (Security ContextHolder)
// Authentication 객체가 들어와야한다.
// Authentication 객체 안에 User정보가 포함되어야함.
// User정보는 UserDetails 객체여야한다.

// Security Session -> Authentication -> UserDetails
@Getter
public class PrincipalDetails implements UserDetails {

    private User user;

    public PrincipalDetails(User user) {
        this.user = user;
    }

    // user의 권한을 return
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        user.roleList().forEach(r->
                collect.add(() -> r)
        );
        return collect;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 휴먼회원 처리등에 사용된다.
    @Override
    public boolean isEnabled() {
        return true;
    }
}
