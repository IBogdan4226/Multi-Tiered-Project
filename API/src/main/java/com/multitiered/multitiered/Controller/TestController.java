package com.multitiered.multitiered.Controller;

import com.multitiered.multitiered.Entities.Test;
import com.multitiered.multitiered.Entities.TestStudent;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Exceptions.TestNotFound;
import com.multitiered.multitiered.Interfaces.ITestService;
import com.multitiered.multitiered.POJO.*;
import com.multitiered.multitiered.Utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/test")
public class TestController {
    private final ITestService _testService;
    private final JwtTokenUtil _jwtUtil;

    @Autowired
    public TestController(ITestService testService, JwtTokenUtil jwtUtil) {
        _testService = testService;
        _jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<TestPreview>> listAllTests(@RequestHeader(name = "Authorization") String jwtToken,
                                                          @RequestParam(required = false) String testName) {
        String userId = _extractUserId(jwtToken);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<Test> tests = _testService.getTestFromTeacher(userId, testName);
        if (tests.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<TestPreview> testPreviews = tests.stream()
                .map(test -> new TestPreview(test.getId(), test.getTestName()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(testPreviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTestById(@PathVariable String id,
                                         @RequestHeader(name = "Authorization") String jwtToken) {
        String userId = _extractUserId(jwtToken);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            Test test = _testService.getTest(id);
            if (!test.getTeacherId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            TestDTO testDTO = new TestDTO(test);
            return ResponseEntity.ok(testDTO);
        } catch (TestNotFound ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/{id}/students")
    public ResponseEntity<?> getStudentsFromTest(@PathVariable String id,
                                                 @RequestHeader(name = "Authorization") String jwtToken) {
        String userId = _extractUserId(jwtToken);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<TestStudentGradeLightDTO> students = _testService.findAllStudentsByTestId(id);
        if (students.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(students);
    }

    @PostMapping
    public ResponseEntity<?> createTest(@RequestBody Test test) {
        try {
            Test savedTest = _testService.save(test);
            TestDTO testDTO = new TestDTO(savedTest);
            return ResponseEntity.status(HttpStatus.CREATED).body(testDTO);
        } catch (DataAccessException | GenericException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(ex.getMessage());
        }
    }

    @PostMapping("{testId}/student/{studentId}")
    public ResponseEntity<?> gradeStudent(@RequestBody TestStudentRequestDTO testStudentGrade,
                                          @PathVariable String testId, @PathVariable String studentId) {
        try {
            TestStudent savedTestStudent = _testService.saveStudentGrade(
                    testStudentGrade, testId, studentId
            );
            TestStudentDTO testDTO = new TestStudentDTO(savedTestStudent);
            return ResponseEntity.status(HttpStatus.CREATED).body(testDTO);
        } catch (DataAccessException | GenericException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTest(@PathVariable String id,
                                        @RequestBody Test test,
                                        @RequestHeader(name = "Authorization") String jwtToken) {
        String userId = _extractUserId(jwtToken);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            Test existingTest = _testService.getTest(id);
            if (!existingTest.getTeacherId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            _updateTestDetails(existingTest, test);
            _testService.save(existingTest);
            return ResponseEntity.noContent().build();
        } catch (TestNotFound ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (DataAccessException | GenericException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTest(@PathVariable String id,
                                        @RequestHeader(name = "Authorization") String jwtToken) {
        String userId = _extractUserId(jwtToken);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            Test test = _testService.getTest(id);
            if (!test.getTeacherId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            _testService.delete(id);
            TestDTO testDTO = new TestDTO(test);
            return ResponseEntity.ok(testDTO);
        } catch (TestNotFound ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }


    private String _extractUserId(String jwtToken) {
        String jwt = jwtToken.startsWith("Bearer ") ? jwtToken.substring(7) : jwtToken;
        return _jwtUtil.getUserIdFromToken(jwt);
    }

    private void _updateTestDetails(Test existingTest, Test newTest) {
        existingTest.setTestName(newTest.getTestName());
        existingTest.setTeacherId(newTest.getTeacherId());
        existingTest.setQuestions(newTest.getQuestions());
    }
}
