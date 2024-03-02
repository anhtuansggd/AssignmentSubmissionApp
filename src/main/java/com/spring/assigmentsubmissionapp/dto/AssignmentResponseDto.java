package com.spring.assigmentsubmissionapp.dto;
import com.spring.assigmentsubmissionapp.domain.Assignment;
import com.spring.assigmentsubmissionapp.enums.AssignmentEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponseDto {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public AssignmentEnum[] getAssignmentEnums() {
        return assignmentEnums;
    }
}