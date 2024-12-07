import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Students } from './Students';
import React from 'react';
jest.mock('app/src/hooks/useStudentActions');

const mockGetStudents = jest.fn();
const mockSaveStudent = jest.fn();
const mockUpdateStudent = jest.fn();

jest.mock('app/src/hooks/useStudentActions', () => ({
  useStudentActions: () => ({
    _getStudents: mockGetStudents,
    _saveStudent: mockSaveStudent,
    _updateStudent: mockUpdateStudent,
  }),
}));

describe('Students Component', () => {
  it('renders the filter inputs and add student button', () => {
    render(<Students />);

    expect(screen.getByTestId('name-filter'));
    expect(screen.getByTestId('group-filter'));
    expect(screen.getByTestId('add-student-button'));
  });

  it('shows "No students available" when the students list is empty', async () => {
    mockGetStudents.mockResolvedValue([]);
    render(<Students />);

    await waitFor(() => {
      expect(screen.getByTestId('no-students-message'));
    });
  });

  it('fetches and displays students when filters are applied', async () => {
    const students = [
      { id: '1', name: 'John Doe', group: 'A' },
      { id: '2', name: 'Jane Doe', group: 'B' },
    ];
    mockGetStudents.mockResolvedValue(students);

    render(<Students />);

    await waitFor(() => {
      expect(screen.getByTestId('students-list'));
      expect(screen.getByText('John Doe'));
      expect(screen.getByText('Jane Doe'));
    });
  });

  it('debounces name filter changes and fetches students', async () => {
    mockGetStudents.mockResolvedValue([]);
    render(<Students />);

    const nameFilter = screen
      .getByTestId('name-filter')
      .querySelector('input') as HTMLInputElement;
    fireEvent.change(nameFilter, { target: { value: 'John' } });

    await waitFor(() =>
      expect(mockGetStudents).toHaveBeenCalledWith('John', '')
    );
  });

  it('opens and closes the modal when adding a new student', async () => {
    render(<Students />);

    const addStudentButton = screen.getByTestId('add-student-button');
    fireEvent.click(addStudentButton);

    await waitFor(() => {
      screen.getByTestId('student-modal');
    });

    const closeButton = screen.getByTestId('close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('student-modal')).toBeNull();
    });
  });
});
