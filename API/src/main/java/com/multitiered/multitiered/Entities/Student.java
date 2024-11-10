package com.multitiered.multitiered.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "students")
public class Student {
    @Setter
    @Getter
    @Id
    private String id;

    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotNull(message = "Group cannot be null")
    @Pattern(regexp = "^\\d{4}[A-Z]$", message = "Group must match pattern xxxxY (e.g., 1204A)")
    private String group;

    public @NotNull(message = "Name cannot be null") @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters") String getName() {
        return name;
    }

    public void setName(@NotNull(message = "Name cannot be null") @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters") String name) {
        this.name = name;
    }

    public @NotNull(message = "Group cannot be null") @Pattern(regexp = "^\\d{4}[A-Z]$", message = "Group must match pattern xxxxY (e.g., 1204A)") String getGroup() {
        return group;
    }

    public void setGroup(@NotNull(message = "Group cannot be null") @Pattern(regexp = "^\\d{4}[A-Z]$", message = "Group must match pattern xxxxY (e.g., 1204A)") String group) {
        this.group = group;
    }
}