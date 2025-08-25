package com.caracameusonho.api.domain.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("admin".equals(username)) {
            // Hash da senha "senha123"
            return User.builder()
                    .username("admin")
                    .password("$2a$10$itf.yfeqxgvf2PXXYDHUc.LTJ1Bl18gmGZ6b.sVoPbwsSkyGAIzC.")
                    .roles("ADMIN")
                    .build();
        } else {
            throw new UsernameNotFoundException("Usuário não encontrado");
        }
    }
}
