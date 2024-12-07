package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.TestStudent;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.POJO.UpdateTestStudentDTO;
import com.multitiered.multitiered.Repository.TestStudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TestStudentServiceTest {
    @Mock
    private TestStudentRepository testStudentRepo;

    @InjectMocks
    private TestStudentService testStudentService;

    private TestStudent existingTestStudent;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        existingTestStudent = new TestStudent("1", "123", "test1", 8.5f, "photo1", "Good performance");
    }

    @Test
    public void testUpdate_withValidData_returnsUpdatedTestStudent() throws GenericException {
        UpdateTestStudentDTO updateDTO = new UpdateTestStudentDTO("Improved performance", 9.0f);

        when(testStudentRepo.findById("1")).thenReturn(java.util.Optional.of(existingTestStudent));
        when(testStudentRepo.save(any(TestStudent.class))).thenReturn(existingTestStudent);

        TestStudent result = testStudentService.update("1", updateDTO);

        assertNotNull(result);
        assertEquals(9.0f, result.getGrade());
        assertEquals("Improved performance", result.getNote());
        verify(testStudentRepo, times(1)).save(any(TestStudent.class));
    }

    @Test
    public void testUpdate_withNullGrade_throwsGenericException() {
        UpdateTestStudentDTO updateDTO = new UpdateTestStudentDTO("No grade", null);

        assertThrows(GenericException.class, () -> testStudentService.update("1", updateDTO));
    }

    @Test
    public void testUpdate_withInvalidGrade_throwsGenericException() {
        UpdateTestStudentDTO updateDTO = new UpdateTestStudentDTO("Invalid grade", 11.0f);

        assertThrows(GenericException.class, () -> testStudentService.update("1", updateDTO));
    }

    @Test
    public void testUpdate_withStudentNotFound_throwsGenericException() {
        UpdateTestStudentDTO updateDTO = new UpdateTestStudentDTO("", 9.0f);

        when(testStudentRepo.findById("1")).thenReturn(java.util.Optional.empty());

        assertThrows(GenericException.class, () -> testStudentService.update("1", updateDTO));
    }

    @Test
    public void testUpdate_withValidData_updates() throws GenericException {
        UpdateTestStudentDTO updateDTO = new UpdateTestStudentDTO("Updated note", 8.5f);

        when(testStudentRepo.findById("1")).thenReturn(java.util.Optional.of(existingTestStudent));
        when(testStudentRepo.save(any(TestStudent.class))).thenReturn(existingTestStudent);

        TestStudent result = testStudentService.update("1", updateDTO);

        assertNotNull(result);
        assertEquals("Updated note", result.getNote());
        assertEquals(8.5f, result.getGrade());
    }
}