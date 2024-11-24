package com.multitiered.multitiered.Interfaces;

import com.multitiered.multitiered.Entities.Student;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Exceptions.StudentNotFound;

import java.util.List;

public interface IStudentService {
    List<Student> listAll(String studentName, String groupName);

    Student getStudent(String studentId) throws StudentNotFound;

    Student save(Student student) throws GenericException;

    void delete(String id);
}