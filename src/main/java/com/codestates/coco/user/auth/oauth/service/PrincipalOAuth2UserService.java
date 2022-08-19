package com.codestates.coco.user.auth.oauth.service;

import com.codestates.coco.user.auth.domain.PrincipalDetails;
import com.codestates.coco.user.auth.domain.ProviderType;
import com.codestates.coco.user.auth.domain.RoleType;
import com.codestates.coco.user.auth.oauth.exception.OAuth2ProviderMissMatchException;
import com.codestates.coco.user.auth.oauth.info.OAuth2UserInfo;
import com.codestates.coco.user.auth.oauth.info.OAuth2UserInfoFactory;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            return this.process(userRequest, oAuth2User);
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalAuthenticationServiceException(e.getMessage(), e.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        User savedUser = userRepository.findByProviderId(userInfo.getId());

        if (savedUser != null) {
            if (providerType != savedUser.getProviderType()) {
                throw new OAuth2ProviderMissMatchException(
                        "Looks like you're signed up with" + providerType + "account. please use your " + savedUser.getProviderType() + " account to login"
                );
            }

            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo, providerType);
        }

        return PrincipalDetails.create(savedUser, user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        User user = new User(
                userInfo.getEmail(),
                "NO_PASS",
                userInfo.getName(),
                "39th",
                userInfo.getImageUrl(),
                RoleType.USER,
                providerType,
                userInfo.getId()
        );

        return userRepository.save(user);
    }

    private User updateUser(User user, OAuth2UserInfo userInfo) {
/*        if (userInfo.getName() != null && !user.getUsername().equals(userInfo.getName())) {
            user.setUsername(userInfo.getName());
        }*/

        if (userInfo.getImageUrl() != null && !user.getProfileImg().equals(userInfo.getImageUrl())) {
            user.setProfileImg(userInfo.getImageUrl());
        }

        return userRepository.save(user);
    }
}