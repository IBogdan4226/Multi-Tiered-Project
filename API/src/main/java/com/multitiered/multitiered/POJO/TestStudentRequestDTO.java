package com.multitiered.multitiered.POJO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestStudentRequestDTO {
    private Float grade;
    private String photo;
    private String note;
}
