package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.Test;
import com.multitiered.multitiered.Exceptions.TestNotFound;
import com.multitiered.multitiered.Interfaces.ITestService;
import com.multitiered.multitiered.Repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService implements ITestService {

    private final TestRepository _testRepo;

    @Autowired
    public TestService(TestRepository testRepo) {
        _testRepo = testRepo;
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

}

