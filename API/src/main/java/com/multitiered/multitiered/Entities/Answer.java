package com.multitiered.multitiered.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {

    @NotNull(message = "Answer ID cannot be null")
    private Integer aID;

    @NotNull(message = "Answer text cannot be null")
    @Size(min = 1, max = 500, message = "Answer must be between 1 and 500 characters")
    private String answer;

    private boolean isCorrect;

    public @NotNull(message = "Answer ID cannot be null") Integer getId() {
        return aID;
    }

    public void setId(@NotNull(message = "Answer ID cannot be null") Integer aID) {
        this.aID = aID;
    }

    public @NotNull(message = "Answer text cannot be null") @Size(min = 1, max = 500, message = "Answer must be between 1 and 500 characters") String getAnswer() {
        return answer;
    }

    public void setAnswer(@NotNull(message = "Answer text cannot be null") @Size(min = 1, max = 500, message = "Answer must be between 1 and 500 characters") String answer) {
        this.answer = answer;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}