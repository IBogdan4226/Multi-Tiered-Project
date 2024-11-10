package com.multitiered.multitiered.POJO;

import com.multitiered.multitiered.Entities.Question;
import com.multitiered.multitiered.Entities.Test;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestDTO {
    private String id;
    private String teacherId;
    private String testName;
    private List<Question> questions;

    public TestDTO(Test test) {
        this.id = test.getId();
        this.teacherId = test.getTeacherId();
        this.testName = test.getTestName();
        this.questions = test.getQuestions();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}