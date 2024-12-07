package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.*;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.Exceptions.TestNotFound;
import com.multitiered.multitiered.POJO.TestStudentDTO;
import com.multitiered.multitiered.POJO.TestStudentGradeLightDTO;
import com.multitiered.multitiered.POJO.TestStudentRequestDTO;
import com.multitiered.multitiered.Repository.StudentRepository;
import com.multitiered.multitiered.Repository.TestRepository;
import com.multitiered.multitiered.Repository.TestStudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TestServiceTest {
    @Mock
    private TestRepository testRepository;

    @Mock
    private TestStudentRepository testStudentRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private TestService testService;

    private Test test;
    private TestStudent testStudent;
    private TestStudentRequestDTO testStudentRequestDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        Question question1 = new Question(1, "What is Java?", Arrays.asList(
                new Answer(1,"A programming language", true),
                new Answer(2, "A coffee type", false)
        ));

        Question question2 = new Question(2, "What is Java?", Arrays.asList(
                new Answer(1,"A programming language", true),
                new Answer(2, "A coffee type", false)
        ));

        Question question3 = new Question(1, "What is Java?", Arrays.asList(
                new Answer(1,"A programming language", true),
                new Answer(2, "A coffee type", false)
        ));

        test = new Test("1", "teacher123", "Java Basics", List.of(question1,question2,question3));

        testStudent = new TestStudent("1", "student123", "1", 9.0f, null, "Good job");

        testStudentRequestDTO = new TestStudentRequestDTO(9.0f, null, "Well done!");
    }

    @org.junit.jupiter.api.Test
    void testListAll_ReturnsAllTests() {
        List<Test> tests = Collections.singletonList(test);
        when(testRepository.findAll()).thenReturn(tests);

        List<Test> result = testService.listAll();
        assertEquals(1, result.size());
        assertEquals("Java Basics", result.get(0).getTestName());
    }

    @org.junit.jupiter.api.Test
    void testGetTest_ValidId_ReturnsTest() throws TestNotFound {
        when(testRepository.findById("1")).thenReturn(Optional.of(test));

        Test result = (Test) testService.getTest("1");
        assertNotNull(result);
        assertEquals("Java Basics", result.getTestName());
    }

    @org.junit.jupiter.api.Test
    void testSave_ValidTest_SavesSuccessfully() throws GenericException {
        when(testRepository.save(test)).thenReturn(test);

        Test result = testService.save(test);
        assertNotNull(result);
        assertEquals("Java Basics", result.getTestName());
    }

    @org.junit.jupiter.api.Test
    void testSave_InvalidTestName_ThrowsGenericException() {
        test.setTestName("A");
        assertThrows(GenericException.class, () -> testService.save(test));
    }

    @org.junit.jupiter.api.Test
    void testSaveStudentGrade_ValidData_SavesSuccessfully() throws GenericException {
        when(testStudentRepository.save(any(TestStudent.class))).thenReturn(testStudent);

        TestStudent result = testService.saveStudentGrade(testStudentRequestDTO, "1", "student123");
        assertNotNull(result);
        assertEquals(9.0f, result.getGrade());
    }

    @org.junit.jupiter.api.Test
    void testSaveStudentGrade_InvalidGrade_ThrowsGenericException() {
        testStudentRequestDTO.setGrade(11.0f);

        assertThrows(GenericException.class, () -> testService.saveStudentGrade(testStudentRequestDTO, "1", "student123"));
    }

    @org.junit.jupiter.api.Test
    void testFindAllStudentsByTestId_ReturnsStudentGrades() {
        List<TestStudentGradeLightDTO> gradeLightDTOs = Collections.singletonList(
                new TestStudentGradeLightDTO("1", "student123", null, "1", 9.0f)
        );
        List<Student> students = Collections.singletonList(new Student("student123", "Alice", "1204A"));

        when(testStudentRepository.findAllByTestId("1")).thenReturn(gradeLightDTOs);
        when(studentRepository.findAll()).thenReturn(students);

        List<TestStudentGradeLightDTO> result = testService.findAllStudentsByTestId("1");
        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getStudentName());
    }

    @org.junit.jupiter.api.Test
    void testFindByTestStudentId_ValidId_ReturnsDTO() throws StudentNotFound {
        when(testStudentRepository.findById("1")).thenReturn(Optional.of(testStudent));
        when(studentRepository.findById("student123")).thenReturn(Optional.of(new Student("student123", "Alice", "1204A")));

        TestStudentDTO result = testService.findByTestStudentId("1");
        assertNotNull(result);
        assertEquals("Alice", result.getStudentName());
        assertEquals(9.0f, result.getGrade());
    }
}