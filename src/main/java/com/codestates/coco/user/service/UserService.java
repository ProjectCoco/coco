package com.codestates.coco.user.service;

import com.codestates.coco.user.config.UserDetailsImpl;
import com.codestates.coco.user.domain.User;
import com.codestates.coco.user.domain.UserLoginDTO;
import com.codestates.coco.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);

        if(user!=null) return new UserDetailsImpl(user);
        else return null;
    }

    public User saveUser(UserLoginDTO userLoginDTO) {

        User user = userRepository.save(new User(userLoginDTO.getEmail(), encoder.encode(userLoginDTO.getPassword())));

        return user;
    }

}
