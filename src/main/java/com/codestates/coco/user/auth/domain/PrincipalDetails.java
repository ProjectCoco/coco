package com.codestates.coco.user.auth.domain;

import com.codestates.coco.user.domain.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

// /loginForm 즉, SecurityConfig에 정의한 loginProcessingUrl 을 낚아채서 로그인 진행
// 로그인 진행완료 시 시큐리티 session을 만든다. (Security ContextHolder)
// Authentication 객체가 들어와야한다.
// Authentication 객체 안에 User정보가 포함되어야함.
// User정보는 UserDetails 객체여야한다.

// Security Session -> Authentication -> UserDetails
@Getter
@Setter
public class PrincipalDetails implements UserDetails, OAuth2User, OidcUser {

    private User user;
    private Collection<GrantedAuthority> authorities;

    private Map<String, Object> attributes;

    public PrincipalDetails(User user, Collection<GrantedAuthority> authorities) {
        this.user = user;
        this.authorities = authorities;
    }

    // user의 권한을 return
    @Override
    public String getName() {
        return user.getEmail();
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

    @Override
    public Map<String, Object> getClaims() {
        return null;
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return null;
    }

    public static PrincipalDetails create(User user) {
        return new PrincipalDetails(
                user,
                Collections.singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode()))
        );
    }

    public static PrincipalDetails create(User user, Map<String, Object> attributes) {
        PrincipalDetails userPrincipal = create(user);
        userPrincipal.setAttributes(attributes);

        return userPrincipal;
    }
}
