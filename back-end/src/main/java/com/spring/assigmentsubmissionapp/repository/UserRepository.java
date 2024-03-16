package com.spring.assigmentsubmissionapp.repository;

import com.spring.assigmentsubmissionapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
