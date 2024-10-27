package com.multitiered.multitiered.POJO;

import com.multitiered.multitiered.Entities.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private String id;
    private String name;
    private String group;


    public StudentDTO(Student student) {
        this.id = student.getId();
        this.name = student.getName();
        this.group = student.getGroup();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }
}