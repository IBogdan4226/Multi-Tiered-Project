package com.multitiered.multitiered.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @NotNull(message = "Question ID cannot be null")
    private Integer qID;

    @NotNull(message = "Question text cannot be null")
    @Size(min = 5, max = 1000, message = "Question must be between 5 and 1000 characters")
    private String question;

    @NotNull(message = "Answers cannot be null")
    private List<@NotNull Answer> answers;

    public @NotNull(message = "Question ID cannot be null") Integer getID() {
        return qID;
    }

    public void setID(@NotNull(message = "Question ID cannot be null") Integer qID) {
        this.qID = qID;
    }

    public @NotNull(message = "Question text cannot be null") @Size(min = 5, max = 1000, message = "Question must be between 5 and 1000 characters") String getQuestion() {
        return question;
    }

    public void setQuestion(@NotNull(message = "Question text cannot be null") @Size(min = 5, max = 1000, message = "Question must be between 5 and 1000 characters") String question) {
        this.question = question;
    }

    public @NotNull(message = "Answers cannot be null") List<@NotNull Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(@NotNull(message = "Answers cannot be null") List<@NotNull Answer> answers) {
        this.answers = answers;
    }
}
