package com.spring.assigmentsubmissionapp.repository;

import com.spring.assigmentsubmissionapp.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
