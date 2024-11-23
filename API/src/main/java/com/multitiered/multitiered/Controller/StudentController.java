package com.multitiered.multitiered.Controller;

import com.multitiered.multitiered.Entities.Student;
import com.multitiered.multitiered.Exceptions.StudentNotFound;
import com.multitiered.multitiered.Interfaces.IStudentService;
import com.multitiered.multitiered.POJO.StudentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final IStudentService _studentService;

    @Autowired
    public StudentController(IStudentService studentService) {
        _studentService = studentService;
    }

    @GetMapping()
    public ResponseEntity<?> getStudents(@RequestParam(required = false) String studentName,
                                         @RequestParam(required = false) String groupName) {
        List<Student> students = _studentService.listAll(studentName, groupName);
        if (students.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<StudentDTO> studentsPreview =
                students.stream().map(
                        student -> new StudentDTO(student)
                ).collect(Collectors.toList());

        return new ResponseEntity<>(studentsPreview, HttpStatus.OK);

    }

    @GetMapping("{id}")
    public ResponseEntity<?> getStudentById(@PathVariable String id) {
        try {
            Student student = _studentService.getStudent(id);
            StudentDTO model = new StudentDTO(student);
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (StudentNotFound ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        try {
            Student studentSaved = _studentService.save(student);
            StudentDTO model = new StudentDTO(studentSaved);

            return ResponseEntity.status(HttpStatus.CREATED).body(model);
        } catch (DataAccessException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Not acceptable");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@RequestBody Student student, @PathVariable("id") String id) {
        try {
            Student existingStudent = _studentService.getStudent(id);

            existingStudent.setName(student.getName());
            existingStudent.setGroup(student.getGroup());

            _studentService.save(existingStudent);

            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (StudentNotFound ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (DataAccessException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Not acceptable");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable String id) {
        try {
            Student student = _studentService.getStudent(id);
            _studentService.delete(id);
            StudentDTO studentDTO = new StudentDTO(student);
            return ResponseEntity.ok(studentDTO);
        } catch (StudentNotFound ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}