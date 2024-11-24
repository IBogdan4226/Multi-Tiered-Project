package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.Student;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.Repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    private Student student;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        student = new Student();
        student.setId("123");
        student.setName("John Doe");
        student.setGroup("1204A");
    }

    @Test
    void testGetStudent_ValidId_ReturnsStudent() throws StudentNotFound {
        when(studentRepository.findById("123")).thenReturn(Optional.of(student));
        Student result = studentService.getStudent("123");
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("1204A", result.getGroup());
    }

    @Test
    void testGetStudent_InvalidId_ThrowsStudentNotFound() {
        when(studentRepository.findById("999")).thenReturn(Optional.empty());
        assertThrows(StudentNotFound.class, () -> studentService.getStudent("999"));
    }

    @Test
    void testSaveStudent_ValidStudent_SavesSuccessfully() throws GenericException {
        when(studentRepository.save(student)).thenReturn(student);
        Student result = studentService.save(student);
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("1204A", result.getGroup());
    }

    @Test
    void testSaveStudent_InvalidName_ThrowsGenericException() {
        student.setName("Jo");
        assertThrows(GenericException.class, () -> studentService.save(student));
    }

    @Test
    void testSaveStudent_InvalidGroup_ThrowsGenericException() {
        student.setGroup("120A");
        assertThrows(GenericException.class, () -> studentService.save(student));
    }

    @Test
    void testDeleteStudent_ValidId_DeletesSuccessfully() {
        doNothing().when(studentRepository).deleteById("123");
        studentService.delete("123");
        verify(studentRepository, times(1)).deleteById("123");
    }
}