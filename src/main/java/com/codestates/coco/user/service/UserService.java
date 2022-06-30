package com.codestates.coco.user.service;

import com.codestates.coco.user.config.RedisUtil;
import com.codestates.coco.user.config.auth.PrincipalDetails;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.domain.UserDTO;
import com.codestates.coco.user.jwt.JwtProvider;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final RedisUtil redisUtil;

    private final JwtProvider jwtProvider;

    public User signUp(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userRepository.save(userDTO.toEntity(userDTO));
    }

    public Boolean emailCheck(String email) {
        return !userRepository.existsByEmail(email);
    }

    public Boolean usernameCheck(String username) {
        return !userRepository.existsByUsername(username);
    }

    public void reissueToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtProvider.resovleToken(request.getHeader(jwtProvider.getRefreshHeader()));
        // refresh 토큰이 유효하지 않거나, redis에 저장된 토큰과 일치하지 않거나, BlackList에 등록되어있다면
        if (!jwtProvider.validateToken(refreshToken) || !redisUtil.getData(refreshToken).equals(jwtProvider.getEmailFromClaim(refreshToken)) || redisUtil.hasBlackList(refreshToken)) {
            System.out.println("refreshToken validation exception 처리 요망");
            // nullpointerexception 도 처리해야한다. -> refresh token이 만료되었다는 의미
            return;
        }

        Authentication authentication = jwtProvider.getAuthentication(refreshToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        response.addHeader(jwtProvider.getAccessHeader(), jwtProvider.reissueRefreshToken(refreshToken, principalDetails));
        response.addHeader(jwtProvider.getRefreshHeader(), jwtProvider.createRefreshToken(principalDetails));
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtProvider.resovleToken(request.getHeader(jwtProvider.getRefreshHeader()));
        String accessToken = jwtProvider.resovleToken(request.getHeader(jwtProvider.getAccessHeader()));

        if (!jwtProvider.validateToken(refreshToken) || !jwtProvider.validateToken(accessToken)) {
            System.out.println("logout validation exception 처리 요망");
            return;
        }

        redisUtil.setBlackList(refreshToken, jwtProvider.getEmailFromClaim(refreshToken), jwtProvider.getExpiryMilliSecond(refreshToken));
        redisUtil.deleteData(refreshToken);

        redisUtil.setBlackList(accessToken, jwtProvider.getEmailFromClaim(accessToken), jwtProvider.getExpiryMilliSecond(accessToken));

    }
}
