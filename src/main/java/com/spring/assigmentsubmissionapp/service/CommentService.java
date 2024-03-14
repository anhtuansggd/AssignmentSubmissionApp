package com.spring.assigmentsubmissionapp.service;

import com.spring.assigmentsubmissionapp.domain.Assignment;
import com.spring.assigmentsubmissionapp.domain.Comment;
import com.spring.assigmentsubmissionapp.domain.User;
import com.spring.assigmentsubmissionapp.dto.CommentDto;
import com.spring.assigmentsubmissionapp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.assigmentsubmissionapp.repository.CommentRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        Assignment assignment = assignmentRepository.getById(commentDto.getAssignmentId());
        comment.setAssignment(assignment);
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        comment.setCreatedDate(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId){
        Set<Comment> comments = commentRepository.findByAssignmentId(assignmentId);
        return comments;
    }
}
