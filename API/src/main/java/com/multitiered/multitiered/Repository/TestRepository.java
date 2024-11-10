package com.multitiered.multitiered.Repository;

import com.multitiered.multitiered.Entities.Test;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends MongoRepository<Test, String> {
    List<Test> findAllByTeacherId(String teacherId);

    List<Test> findAllByTeacherIdAndTestNameContainingIgnoreCase(String teacherId, String testName);
}
