package com.spring.assigmentsubmissionapp.repository;

import com.spring.assigmentsubmissionapp.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.assignment.id = :assignmentId")
    Set<Comment> findByAssignmentId(Long assignmentId);
}
