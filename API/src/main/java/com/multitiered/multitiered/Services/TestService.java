package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.*;
import com.multitiered.multitiered.Exceptions.GenericException;
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
    public Test save(Test test) throws GenericException {
        validateTest(test);
        return _testRepo.save(test);
    }

    @Override
    public void delete(String id) {
        _testRepo.deleteById(id);
    }

    @Override
    public TestStudent saveStudentGrade(TestStudentRequestDTO testStudent, String testId, String studentId) throws GenericException {
        if (studentId == null || studentId.trim().isEmpty()) {
            throw new GenericException("Student ID cannot be null or empty.");
        }

        if (testId == null || testId.trim().isEmpty()) {
            throw new GenericException("Test ID cannot be null or empty.");
        }

        Float grade = testStudent.getGrade();
        if (grade == null || grade < 1 || grade > 10) {
            throw new GenericException("Grade must be between 1 and 10.");
        }

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

    private void validateTest(Test test) throws GenericException {
        if (test.getTeacherId() == null ) {
            throw new GenericException("Teacher ID cannot be null.");
        }

        String testName = test.getTestName();
        if (testName == null || testName.trim().isEmpty()) {
            throw new GenericException("Test name cannot be null or empty.");
        }
        if (testName.length() < 3 || testName.length() > 500) {
            throw new GenericException("Test name must be between 3 and 500 characters.");
        }

        List<Question> questions = test.getQuestions();
        if (questions == null || questions.isEmpty()) {
            throw new GenericException("Questions cannot be null or empty.");
        }
        if (questions.size() < 3) {
            throw new GenericException("Test must have at least 3 questions.");
        }

        for (Question question : questions) {
            if (question == null) {
                throw new GenericException("Question cannot be null.");
            }

            String questionText = question.getQuestion();
            if (questionText == null || questionText.trim().isEmpty()) {
                throw new GenericException("Question text cannot be empty.");
            }
            if (questionText.length() < 10 || questionText.trim().split("\\s+").length < 3) {
                throw new GenericException("Question text must be at least 10 characters long and contain at least 3 words.");
            }

            List<Answer> answers = question.getAnswers();
            if (answers == null || answers.isEmpty()) {
                throw new GenericException("Each question must have at least one answer.");
            }

            boolean hasCorrectAnswer = false;
            boolean hasIncorrectAnswer = false;

            for (Answer answer : answers) {
                String answerText = answer.getAnswer();
                if (answerText == null || answerText.trim().isEmpty()) {
                    throw new GenericException("Answer text cannot be empty.");
                }
                if (answer.getIsCorrect()) {
                    hasCorrectAnswer = true;
                } else {
                    hasIncorrectAnswer = true;
                }
            }

            if (!hasCorrectAnswer) {
                throw new GenericException("Each question must have at least one correct answer.");
            }
            if (!hasIncorrectAnswer) {
                throw new GenericException("Each question must have at least one incorrect answer.");
            }
        }
    }
}

