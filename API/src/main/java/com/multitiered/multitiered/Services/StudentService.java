package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.Student;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.Interfaces.IStudentService;
import com.multitiered.multitiered.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class StudentService implements IStudentService {
    private final StudentRepository _studentRepo;

    @Autowired
    public StudentService(StudentRepository studentRepo) {
        _studentRepo = studentRepo;
    }

    @Override
    public List<Student> listAll(String studentName, String groupName) {
        return _studentRepo.findAllByNameContainingIgnoreCaseAndGroupContainingIgnoreCase(
                Objects.requireNonNullElse(studentName, ""),
                Objects.requireNonNullElse(groupName, "")
        );
    }

    @Override
    public Student getStudent(String studentId) throws StudentNotFound {
        return _studentRepo.findById(studentId)
                .orElseThrow(() -> new StudentNotFound(studentId));
    }

    @Override
    public Student save(Student student) throws GenericException {
        String trimmedName = student.getName() != null ? student.getName().trim() : "";
        if (trimmedName.length() <= 3) {
            throw new GenericException("Name must be more than 3 characters long.");
        }

        String group = student.getGroup();
        if (!group.matches("^\\d{4}[A-Z]$")) {
            throw new GenericException("Group must match pattern xxxxY (e.g., 1204A).");
        }

        return _studentRepo.save(student);
    }

    @Override
    public void delete(String id) {
        _studentRepo.deleteById(id);
    }
}