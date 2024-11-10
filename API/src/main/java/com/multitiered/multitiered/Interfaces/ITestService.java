package com.multitiered.multitiered.Interfaces;

import com.multitiered.multitiered.Entities.Test;
import com.multitiered.multitiered.Exceptions.TestNotFound;

import java.util.List;

public interface ITestService {
    List<Test> listAll();

    Test getTest(String id) throws TestNotFound;

    List<Test> getTestFromTeacher(String teacherId, String testName);

    Test save(Test test);

    void delete(String id);
}
