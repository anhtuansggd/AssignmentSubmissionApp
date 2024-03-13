package com.spring.assigmentsubmissionapp.web;

import com.spring.assigmentsubmissionapp.domain.Comment;
import com.spring.assigmentsubmissionapp.domain.User;
import com.spring.assigmentsubmissionapp.dto.CommentDto;
import com.spring.assigmentsubmissionapp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
