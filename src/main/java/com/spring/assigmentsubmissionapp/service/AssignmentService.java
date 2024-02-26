package com.spring.assigmentsubmissionapp.service;

import com.spring.assigmentsubmissionapp.domain.Assignment;
import com.spring.assigmentsubmissionapp.domain.User;
import com.spring.assigmentsubmissionapp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user){
        Assignment assignment = new Assignment();
        assignment.setStatus("Need to be submitted");
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }
}
