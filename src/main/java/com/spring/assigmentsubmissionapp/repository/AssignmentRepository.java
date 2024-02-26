package com.spring.assigmentsubmissionapp.repository;

import com.spring.assigmentsubmissionapp.domain.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}
