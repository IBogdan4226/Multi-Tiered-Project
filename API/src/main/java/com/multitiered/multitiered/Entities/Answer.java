package com.multitiered.multitiered.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    @Id
    @JsonProperty("aId")
    @NotNull(message = "Answer ID cannot be null")
    private Integer aId;

    @JsonProperty("answer")
    @NotNull(message = "Answer text cannot be null")
    @Size(min = 1, max = 500, message = "Answer must be between 1 and 500 characters")
    private String answer;

    @JsonProperty("isCorrect")
    private boolean isCorrect;

    @JsonProperty("aId")
    public Integer getAId() {
        return aId;
    }

    public void setAId(@NotNull(message = "Answer ID cannot be null") Integer aId) {
        this.aId = aId;
    }

    @JsonProperty("answer")
    public String getAnswer() {
        return answer;
    }

    public void setAnswer(@NotNull(message = "Answer text cannot be null")
                          @Size(min = 1, max = 500, message = "Answer must be between 1 and 500 characters") String answer) {
        this.answer = answer;
    }

    @JsonProperty("isCorrect")
    public boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
}