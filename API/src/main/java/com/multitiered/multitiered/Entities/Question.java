package com.multitiered.multitiered.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @JsonProperty("qId")
    @NotNull(message = "Question ID cannot be null")
    private Integer qId;

    @JsonProperty("question")
    @NotNull(message = "Question text cannot be null")
    @Size(min = 5, max = 1000, message = "Question must be between 5 and 1000 characters")
    private String question;

    @JsonProperty("answers")
    @NotNull(message = "Answers cannot be null")
    private List<@NotNull Answer> answers;

    @JsonProperty("qId")
    public Integer getQId() {
        return qId;
    }

    public void setQId(@NotNull Integer qId) {
        this.qId = qId;
    }

    @JsonProperty("question")
    public String getQuestion() {
        return question;
    }

    public void setQuestion(@NotNull @Size(min = 5, max = 1000) String question) {
        this.question = question;
    }

    @JsonProperty("answers")
    public List<@NotNull Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(@NotNull List<@NotNull Answer> answers) {
        this.answers = answers;
    }
}