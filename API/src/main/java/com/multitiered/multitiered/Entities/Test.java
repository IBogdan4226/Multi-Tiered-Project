package com.multitiered.multitiered.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "test")
public class Test {
    @Setter
    @Getter
    @Id
    private String id;

    @NotNull(message = "Teacher ID cannot be null")
    private String teacherId;

    @NotNull(message = "Test name cannot be null")
    @Size(min = 3, max = 500, message = "Test name must be between 3 and 500 characters")
    private String testName;

    @NotNull(message = "Questions cannot be null")
    private List<@NotNull Question> questions;

    public @NotNull(message = "Teacher ID cannot be null") String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(@NotNull(message = "Teacher ID cannot be null") String teacherId) {
        this.teacherId = teacherId;
    }

    public @NotNull(message = "Test name cannot be null") @Size(min = 3, max = 500, message = "Test name must be between 3 and 500 characters") String getTestName() {
        return testName;
    }

    public void setTestName(@NotNull(message = "Test name cannot be null") @Size(min = 3, max = 500, message = "Test name must be between 3 and 500 characters") String testName) {
        this.testName = testName;
    }

    public @NotNull(message = "Questions cannot be null") List<@NotNull Question> getQuestions() {
        return questions;
    }

    public void setQuestions(@NotNull(message = "Questions cannot be null") List<@NotNull Question> questions) {
        this.questions = questions;
    }
}
