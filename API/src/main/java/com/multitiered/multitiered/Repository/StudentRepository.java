package com.multitiered.multitiered.Repository;

import com.multitiered.multitiered.Entities.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Page<Student> findByIdIn(List<String> studentIds, Pageable page);

    List<Student> findAllByNameContainingAndGroupContaining(String name, String group);
}