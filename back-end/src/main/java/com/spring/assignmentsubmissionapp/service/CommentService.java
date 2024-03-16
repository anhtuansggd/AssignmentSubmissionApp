package com.spring.assignmentsubmissionapp.service;

import com.spring.assignmentsubmissionapp.domain.Assignment;
import com.spring.assignmentsubmissionapp.domain.Comment;
import com.spring.assignmentsubmissionapp.domain.User;
import com.spring.assignmentsubmissionapp.dto.CommentDto;
import com.spring.assignmentsubmissionapp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.assignmentsubmissionapp.repository.CommentRepository;

import java.time.ZonedDateTime;
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
        comment.setId(commentDto.getId());
        comment.setAssignment(assignment);
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        if(comment.getId() == null){
            comment.setCreatedDate(ZonedDateTime.now());
        }else{
            comment.setCreatedDate(commentDto.getCreatedDate());
        }


        return commentRepository.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId){
        Set<Comment> comments = commentRepository.findByAssignmentId(assignmentId);
        return comments;
    }

    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
