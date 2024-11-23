package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.Student;
import com.multitiered.multitiered.Entities.Test;
import com.multitiered.multitiered.Entities.TestStudent;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.Exceptions.TestNotFound;
import com.multitiered.multitiered.Interfaces.ITestService;
import com.multitiered.multitiered.POJO.TestStudentDTO;
import com.multitiered.multitiered.POJO.TestStudentGradeLightDTO;
import com.multitiered.multitiered.POJO.TestStudentRequestDTO;
import com.multitiered.multitiered.Repository.StudentRepository;
import com.multitiered.multitiered.Repository.TestRepository;
import com.multitiered.multitiered.Repository.TestStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TestService implements ITestService {
    private final TestRepository _testRepo;
    private final TestStudentRepository _testStudentRepo;
    private final StudentRepository _studentRepository;

    @Autowired
    public TestService(TestRepository testRepo, TestStudentRepository testStudentRepo, StudentRepository studentRepository) {
        _testRepo = testRepo;
        _testStudentRepo = testStudentRepo;
        _studentRepository = studentRepository;
    }

    @Override
    public List<Test> listAll() {
        return _testRepo.findAll();
    }

    @Override
    public Test getTest(String id) throws TestNotFound {
        return _testRepo.findById(id).orElseThrow(() -> new TestNotFound(id));
    }

    @Override
    public List<Test> getTestFromTeacher(String teacherId, String testName) {
        if (testName == null) {
            return _testRepo.findAllByTeacherId(teacherId);
        }
        return _testRepo.findAllByTeacherIdAndTestNameContainingIgnoreCase(teacherId, testName);
    }

    @Override
    public Test save(Test test) {
        return _testRepo.save(test);
    }

    @Override
    public void delete(String id) {
        _testRepo.deleteById(id);
    }

    @Override
    public TestStudent saveStudentGrade(TestStudentRequestDTO testStudent, String testId, String studentId) {
        TestStudent fullObject = new TestStudent(
                null,
                studentId,
                testId,
                testStudent.getGrade(),
                testStudent.getPhoto(),
                testStudent.getNote()
        );
        return _testStudentRepo.save(fullObject);
    }

    @Override
    public List<TestStudentGradeLightDTO> findAllStudentsByTestId(String testId) {
        List<Student> students = _studentRepository.findAll();
        List<TestStudentGradeLightDTO> testStudentGradeLightDTOs = _testStudentRepo.findAllByTestId(testId);
        Map<String, String> studentIdToNameMap = students.stream()
                .collect(Collectors.toMap(Student::getId, Student::getName));

        testStudentGradeLightDTOs.forEach(dto ->
                dto.setStudentName(studentIdToNameMap.get(dto.getStudentId())));

        return testStudentGradeLightDTOs;
    }

    @Override
    public TestStudentDTO findByTestStudentId(String testStudentId) throws StudentNotFound {
        TestStudent testStudent = _testStudentRepo.findById(testStudentId).orElseThrow(() -> new StudentNotFound("Student test not found with id: " + testStudentId));

        if (testStudent != null) {
            Student student = _studentRepository.findById(testStudent.getStudentId())
                    .orElseThrow(() -> new StudentNotFound("Student not found with id: " + testStudent.getStudentId()));

            TestStudentDTO studentDTO = new TestStudentDTO(testStudent);
            studentDTO.setStudentName(student.getName());
            return studentDTO;
        }
        return null;
    }
}

