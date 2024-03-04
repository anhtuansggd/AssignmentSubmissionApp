package com.spring.assigmentsubmissionapp.service;

import com.spring.assigmentsubmissionapp.domain.User;
import com.spring.assigmentsubmissionapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public Optional<User> findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
