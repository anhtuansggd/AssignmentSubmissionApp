package com.spring.assigmentsubmissionapp.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    ASSIGNMENT_1(1, "assignment 1"),
    ASSIGNMENT_2(2, "assignment 2"),
    ASSIGNMENT_3(3, "assignment 3"),
    ASSIGNMENT_4(4, "assignment 4"),
    ASSIGNMENT_5(5, "assignment 5"),
    ASSIGNMENT_6(6, "assignment 6"),
    ASSIGNMENT_7(7, "assignment 7"),
    ASSIGNMENT_8(8, "assignment 8"),
    ASSIGNMENT_9(9, "assignment 9"),
    ASSIGNMENT_10(10, "assignment 10"),
    ASSIGNMENT_11(11, "assignment 11"),
    ASSIGNMENT_12(12, "assignment 12"),
    ASSIGNMENT_13(13, "assignment 13"),
    ASSIGNMENT_14(14, "assignment 14");



    private int assignmentNum;
    private String assignmentName;

    AssignmentEnum(int assignmentNum, String assignmentName){
        this.assignmentNum = assignmentNum;
        this.assignmentName = assignmentName;
    }
    public int getAssignmentNum() {
        return assignmentNum;
    }

    public String getAssignmentName() {
        return assignmentName;
    }
}
