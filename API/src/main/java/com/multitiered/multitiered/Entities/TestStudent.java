package com.multitiered.multitiered.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "student_tests")
public class TestStudent {
    @Id
    private String id;

    @NotNull(message = "Student ID cannot be blank")
    private String studentId;

    @NotNull(message = "Test ID cannot be blank")
    private String testId;

    @Positive(message = "Grade must be positive")
    private Float grade;

    private String testPhoto;

    private String note;

    public TestStudent(TestStudent other) {
        this.id = other.id;
        this.studentId = other.studentId;
        this.testId = other.testId;
        this.grade = other.grade;
        this.testPhoto = other.testPhoto;
        this.note = other.note;
    }
}