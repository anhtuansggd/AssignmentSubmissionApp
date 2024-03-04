package com.spring.assigmentsubmissionapp.repository;

import com.spring.assigmentsubmissionapp.domain.Assignment;
import com.spring.assigmentsubmissionapp.domain.User;
import com.spring.assigmentsubmissionapp.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);

    @Query("SELECT a FROM Assignment a " +
            "WHERE a.status = 'Submitted' " +
            "OR a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);
}
