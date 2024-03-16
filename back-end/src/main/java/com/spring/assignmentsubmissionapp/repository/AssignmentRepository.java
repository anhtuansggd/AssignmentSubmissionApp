package com.spring.assignmentsubmissionapp.repository;

import com.spring.assignmentsubmissionapp.domain.Assignment;
import com.spring.assignmentsubmissionapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);

    @Query("SELECT a FROM Assignment a " +
            "WHERE (a.status = 'Submitted') AND  (a.codeReviewer is NULL OR a.codeReviewer = :codeReviewer)" +
            "OR a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);

}
