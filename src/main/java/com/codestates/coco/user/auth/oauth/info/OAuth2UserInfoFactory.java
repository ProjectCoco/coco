package com.codestates.coco.user.auth.oauth.info;

import com.codestates.coco.user.auth.domain.ProviderType;
import com.codestates.coco.user.auth.oauth.info.impl.GithubOAuth2UserInfo;
import com.codestates.coco.user.auth.oauth.info.impl.GoogleOAuth2UserInfo;
import com.codestates.coco.user.auth.oauth.info.impl.KakaoOAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            case GITHUB: return new GithubOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type");
        }
    }
}