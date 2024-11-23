package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.TestStudent;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Interfaces.ITestStudentService;
import com.multitiered.multitiered.POJO.UpdateTestStudentDTO;
import com.multitiered.multitiered.Repository.StudentRepository;
import com.multitiered.multitiered.Repository.TestStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestStudentService implements ITestStudentService {
    private final TestStudentRepository _testStudentRepo;

    @Autowired
    public TestStudentService(TestStudentRepository testStudentRepo, StudentRepository studentRepository) {
        _testStudentRepo = testStudentRepo;
    }

    public TestStudent update(String testStudentId, UpdateTestStudentDTO testStudentUpdate) throws GenericException {
        TestStudent testStudent = _testStudentRepo.findById(testStudentId)
                .orElseThrow(() -> new GenericException("Student test not found with id: " + testStudentId));

        TestStudent updatedTestStudent = new TestStudent(testStudent);

        if (testStudentUpdate.getGrade() == null) {
            throw new GenericException("Grade cannot be null.");
        }

        if (testStudentUpdate.getGrade() < 1 || testStudentUpdate.getGrade() > 10) {
            throw new GenericException("Grade must be between 1 and 10.");
        }

        updatedTestStudent.setGrade(testStudentUpdate.getGrade());
        updatedTestStudent.setNote(testStudentUpdate.getNote());

        _testStudentRepo.save(updatedTestStudent);

        return updatedTestStudent;
    }
}
