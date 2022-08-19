package com.codestates.coco.user.auth.service;

import com.codestates.coco.user.auth.domain.PrincipalDetails;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// loginProcessingUrl 설정의 api가 들어오면 UserDdetailsService 타입의 빈에 있는 loadUserByUsername을 실행한다.
// formLogin이 해제되어있을 경우 loginProcessingUrl을 재지정해야한다.
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    // session 안의 Authentication 내부에 UserDetails를 반환한다.
    @Override
    public UserDetails loadUserByUsername(String username) {
        User userEntity = userRepository.findByEmail(username);
        if (userEntity != null) {
            return PrincipalDetails.create(userEntity);
        }

        throw new UsernameNotFoundException(username);
    }
}
