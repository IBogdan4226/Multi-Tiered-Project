package com.multitiered.multitiered.POJO;


import com.multitiered.multitiered.Entities.TestStudent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestStudentDTO {
    private String id;
    private String studentId;
    private String studentName;
    private String testId;
    private Float grade;
    private String testPhoto;
    private String note;

    public TestStudentDTO(TestStudent testStudent) {
        this.id = testStudent.getId();
        this.studentId = testStudent.getStudentId();
        this.testId = testStudent.getTestId();
        this.grade = testStudent.getGrade();
        this.testPhoto = testStudent.getTestPhoto();
        this.note = testStudent.getNote();
    }
}
