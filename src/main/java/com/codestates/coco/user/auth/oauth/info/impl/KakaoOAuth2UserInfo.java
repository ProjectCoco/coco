package com.codestates.coco.user.auth.oauth.info.impl;

import com.codestates.coco.user.auth.oauth.info.OAuth2UserInfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("nickname");
    }

    @Override
    public String getEmail() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("kakao_account");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("email");
    }
    @Override
    public String getImageUrl() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("properties");

        if (response == null) {
            return null;
        }

        return (String) response.get("thumbnail_image");
    }
}

