package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.Student;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.Interfaces.IStudentService;
import com.multitiered.multitiered.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class StudentService implements IStudentService {
    private final StudentRepository _studentRepo;

    @Autowired
    public StudentService(StudentRepository studentRepo) {
        _studentRepo = studentRepo;
    }

    @Override
    public List<Student> listAll() {
        return _studentRepo.findAll();
    }

    @Override
    public Student getStudent(String studentId) throws StudentNotFound {
        return _studentRepo.findById(studentId)
                .orElseThrow(() -> new StudentNotFound(studentId));
    }

    @Override
    public Student save(Student student) {
        return _studentRepo.save(student);
    }

    @Override
    public void delete(String id) {
        _studentRepo.deleteById(id);
    }
}