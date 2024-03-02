package com.spring.assigmentsubmissionapp.web;

import com.spring.assigmentsubmissionapp.domain.Assignment;
import com.spring.assigmentsubmissionapp.domain.User;
import com.spring.assigmentsubmissionapp.dto.AssignmentResponseDto;
import com.spring.assigmentsubmissionapp.service.AssignmentService;
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
        Assignment updatedAssignment = assignmentService.save(assignment);
        return  ResponseEntity.ok(updatedAssignment);
    }
}
