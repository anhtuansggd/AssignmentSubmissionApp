package com.spring.assignmentsubmissionapp.web;

import com.spring.assignmentsubmissionapp.domain.Comment;
import com.spring.assignmentsubmissionapp.domain.User;
import com.spring.assignmentsubmissionapp.dto.CommentDto;
import com.spring.assignmentsubmissionapp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @PostMapping("")
    public ResponseEntity<Comment>createComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user){
        Comment comment = commentService.save(commentDto, user);
        return ResponseEntity.ok(comment);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user){
        Comment comment = commentService.save(commentDto, user);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("")
    public ResponseEntity<Set<Comment>> getCommentsByAssignment(@RequestParam Long assignmentId){
        Set<Comment> comments = commentService.getCommentsByAssignmentId(assignmentId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<?> deleteComment (@PathVariable Long commentId) {
        try {
            commentService.delete(commentId);
            return ResponseEntity.ok("Comment deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
