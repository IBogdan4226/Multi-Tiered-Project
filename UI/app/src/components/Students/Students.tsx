import { Box, Button, TextField, Typography } from '@mui/material';
import debounce from '@mui/utils/debounce';
import { Student } from 'app/src/types/Question';
import { useCallback, useEffect, useState } from 'react';
import { StudentPreview } from './StudentPreview/StudentPreview';
import { useStudentActions } from 'app/src/hooks/useStudentActions';
import { StudentModal } from './StudentModal/StudentModal';

export const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filterName, setFilterName] = useState<string>('');
  const [filterGroup, setFilterGroup] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { _getStudents, _saveStudent, _updateStudent } = useStudentActions();

  const handleNameFilterChange = useCallback(
    debounce((value: string) => {
      setFilterName(value);
    }, 500),
    []
  );

  const handleGroupFilterChange = useCallback(
    debounce((value: string) => {
      setFilterGroup(value);
    }, 500),
    []
  );

  useEffect(() => {
    getStudents(filterName, filterGroup);
  }, [filterName, filterGroup]);

  const getStudents = async (filterName: string, filterGroup: string) => {
    const res = await _getStudents(filterName, filterGroup);
    if (res) {
      setStudents(res);
    }
  };

  const handleOpenModal = (student?: Student) => {
    setSelectedStudent(student || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSaveStudent = async (
    name: string,
    group: string,
    id: string | undefined
  ) => {
    let fn: Promise<any>;
    if (id) {
      fn = _updateStudent(id, name, group);
    } else {
      fn = _saveStudent(name, group);
    }

    const res = await fn;
    if (res) {
      handleCloseModal();
      getStudents('', '');
      setSelectedStudent(null);
    }
  };

  return (
    <Box sx={{ padding: 3 }} data-testid="students-container">
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}
        data-testid="filter-container"
      >
        <TextField
          label="Filter by name"
          variant="outlined"
          fullWidth
          onChange={(e) => handleNameFilterChange(e.target.value)}
          data-testid="name-filter"
        />
        <TextField
          label="Filter by group"
          variant="outlined"
          fullWidth
          onChange={(e) => handleGroupFilterChange(e.target.value)}
          data-testid="group-filter"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          sx={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }}
          data-testid="add-student-button"
        >
          Add Student
        </Button>
      </Box>
      {students.length === 0 ? (
        <Typography variant="body1" color="textSecondary" data-testid="no-students-message">
          No students available.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} data-testid="students-list">
          {students.map((student) => (
            <StudentPreview
              key={student.id}
              id={student.id}
              group={student.group}
              name={student.name}
              onClickUpdate={() => handleOpenModal(student)}
            />
          ))}
        </Box>
      )}
      {modalOpen && (
        <StudentModal
          open={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveStudent}
          initialState={selectedStudent}
        />
      )}
    </Box>
  );
};
