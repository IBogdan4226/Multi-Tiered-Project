package com.multitiered.multitiered.POJO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestStudentGradeLightDTO {
    private String id;
    private String studentId;
    private String studentName;
    private String testId;
    private Float grade;
}
