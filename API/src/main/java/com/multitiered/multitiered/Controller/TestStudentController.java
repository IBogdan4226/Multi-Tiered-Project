package com.multitiered.multitiered.Controller;

import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.Interfaces.ITestService;
import com.multitiered.multitiered.Interfaces.ITestStudentService;
import com.multitiered.multitiered.POJO.TestStudentDTO;
import com.multitiered.multitiered.POJO.UpdateTestStudentDTO;
import com.multitiered.multitiered.Utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test-student")
public class TestStudentController {
    private final ITestService _testService;
    private final ITestStudentService _testStudentService;
    private final JwtTokenUtil _jwtUtil;

    @Autowired
    public TestStudentController(ITestService testService, ITestStudentService testStudentService, JwtTokenUtil jwtUtil) {
        _testService = testService;
        _testStudentService = testStudentService;
        _jwtUtil = jwtUtil;
    }

    @GetMapping("{testStudentId}")
    public ResponseEntity<?> getStudentFromTest(@PathVariable String testStudentId,
                                                @RequestHeader(name = "Authorization") String jwtToken) throws StudentNotFound {
        String userId = _extractUserId(jwtToken);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        TestStudentDTO student = _testService.findByTestStudentId(testStudentId);

        return ResponseEntity.ok(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTestStudent(@PathVariable String id,
                                               @RequestBody UpdateTestStudentDTO testStudent,
                                               @RequestHeader(name = "Authorization") String jwtToken) {
        String userId = _extractUserId(jwtToken);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            _testStudentService.update(id, testStudent);
            return ResponseEntity.noContent().build();

        } catch (DataAccessException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Data access error");
        } catch (GenericException | StudentNotFound e) {
            throw new RuntimeException(e);
        }
    }

    private String _extractUserId(String jwtToken) {
        String jwt = jwtToken.startsWith("Bearer ") ? jwtToken.substring(7) : jwtToken;
        return _jwtUtil.getUserIdFromToken(jwt);
    }
}
