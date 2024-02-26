package com.spring.assigmentsubmissionapp.repository;

import com.spring.assigmentsubmissionapp.domain.Assignment;
import com.spring.assigmentsubmissionapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);
}
