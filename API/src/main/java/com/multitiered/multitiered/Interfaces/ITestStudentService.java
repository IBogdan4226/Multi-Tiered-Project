package com.multitiered.multitiered.Interfaces;

import com.multitiered.multitiered.Entities.TestStudent;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.POJO.UpdateTestStudentDTO;

public interface ITestStudentService {
    TestStudent update(String id, UpdateTestStudentDTO testStudent) throws StudentNotFound, GenericException;
}
