package com.multitiered.multitiered.Interfaces;

import com.multitiered.multitiered.Entities.Test;
import com.multitiered.multitiered.Entities.TestStudent;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.Exceptions.TestNotFound;
import com.multitiered.multitiered.POJO.TestStudentDTO;
import com.multitiered.multitiered.POJO.TestStudentGradeLightDTO;
import com.multitiered.multitiered.POJO.TestStudentRequestDTO;

import java.util.List;

public interface ITestService {
    List<Test> listAll();

    Test getTest(String id) throws TestNotFound;

    List<Test> getTestFromTeacher(String teacherId, String testName);

    Test save(Test test);

    void delete(String id);

    TestStudent saveStudentGrade(TestStudentRequestDTO testStudent, String testId, String studentId);

    List<TestStudentGradeLightDTO> findAllStudentsByTestId(String testId);

    TestStudentDTO findByTestStudentId(String testStudentId) throws StudentNotFound;
}
