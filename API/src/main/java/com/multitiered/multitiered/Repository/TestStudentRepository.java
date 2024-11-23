package com.multitiered.multitiered.Repository;

import com.multitiered.multitiered.Entities.TestStudent;
import com.multitiered.multitiered.POJO.TestStudentGradeLightDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TestStudentRepository extends MongoRepository<TestStudent, String> {
    @Query(value = "{ 'testId': ?0 }", fields = "{ 'testPhoto': 0 }")
    List<TestStudentGradeLightDTO> findAllByTestId(String testId);
}