package com.spring.assignmentsubmissionapp.web;

import com.spring.assignmentsubmissionapp.domain.Assignment;
import com.spring.assignmentsubmissionapp.domain.User;
import com.spring.assignmentsubmissionapp.dto.AssignmentResponseDto;
import com.spring.assignmentsubmissionapp.enums.AuthorityEnum;
import com.spring.assignmentsubmissionapp.service.AssignmentService;
import com.spring.assignmentsubmissionapp.service.UserService;
import com.spring.assignmentsubmissionapp.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user){
        Assignment newAssignment = assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
        Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
        return ResponseEntity.ok(assignmentsByUser);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignments(@PathVariable Long assignmentId,
                                            @AuthenticationPrincipal User user){
        Optional<Assignment> assignmentOptional = assignmentService.findById(assignmentId);
        AssignmentResponseDto response = new AssignmentResponseDto(assignmentOptional.orElse(new Assignment()));
        return ResponseEntity.ok(response);
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignments(@PathVariable Long assignmentId,
                                            @RequestBody Assignment assignment,
                                            @AuthenticationPrincipal User user){
        //add code reviewer to this assignment if it was claimed
        if(assignment.getCodeReviewer() != null){
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)){
                assignment.setCodeReviewer(codeReviewer);
            }
        }
        Assignment updatedAssignment = assignmentService.save(assignment);
        return  ResponseEntity.ok(updatedAssignment);
    }
}
