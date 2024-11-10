package com.multitiered.multitiered.Exceptions;

public class StudentNotFound extends Exception {
    public StudentNotFound(String id) {
        super("Student not found with id: " + id);
    }
}
