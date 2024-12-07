import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { TestStudentDetails } from './TestStudentDetails';

const mockGetStudentFromTest = jest.fn();
const mockUpdateStudentFromTest = jest.fn();
jest.mock('app/src/hooks/useTestActions', () => ({
  useTestActions: () => ({
    _getStudentFromTest: mockGetStudentFromTest,
    _updateStudentFromTest: mockUpdateStudentFromTest,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ testStudentId: '123' }),
}));

describe('TestStudentDetails', () => {
  it('renders all fields and elements correctly', async () => {
    mockGetStudentFromTest.mockResolvedValueOnce({
      data: {
        studentName: 'John Doe',
        note: 'Good work',
        grade: 8,
      },
    });

    render(
      <MemoryRouter>
        <TestStudentDetails />
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-student-details'));
    await screen.findByText('John Doe');
    expect(screen.getByTestId('note-input'));
    expect(screen.getByTestId('grade-input'));
    expect(screen.getByTestId('update-button'));
  });

  it('handles input changes', async () => {
    mockGetStudentFromTest.mockResolvedValueOnce({
      data: {
        studentName: 'John Doe',
        note: '',
        grade: '',
      },
    });

    render(
      <MemoryRouter>
        <TestStudentDetails />
      </MemoryRouter>
    );

    const updateButton = await screen.findByTestId('update-button');

    const noteInput = screen
      .getByTestId('note-input')
      .querySelector('input') as HTMLInputElement;
    const gradeInput = screen
      .getByTestId('grade-input')
      .querySelector('input') as HTMLInputElement;

    await userEvent.type(noteInput, 'Excellent');
    await userEvent.type(gradeInput, '9');

    await userEvent.click(updateButton);
    expect(mockUpdateStudentFromTest).toHaveBeenCalledWith(
      '123',
      'Excellent',
      '9'
    );
  });

  it('handles update failure', async () => {
    const mockGetStudentFromTest = jest.spyOn(
      require('app/src/hooks/useTestActions').useTestActions(),
      '_getStudentFromTest'
    );
    const mockUpdateStudentFromTest = jest.spyOn(
      require('app/src/hooks/useTestActions').useTestActions(),
      '_updateStudentFromTest'
    );

    mockGetStudentFromTest.mockResolvedValueOnce({
      data: {
        studentName: 'John Doe',
        note: 'Good',
        grade: 8,
      },
    });
    mockUpdateStudentFromTest.mockResolvedValueOnce(false);

    render(
      <MemoryRouter>
        <TestStudentDetails />
      </MemoryRouter>
    );

    const updateButton = await screen.findByTestId('update-button');
    await userEvent.click(updateButton);

    expect((await screen.findByTestId('error-message')).textContent).toBe(
      'Failed to update. Please try again.'
    );
  });

  it('displays error for invalid grade', async () => {
    mockGetStudentFromTest.mockResolvedValueOnce({
      data: {
        studentName: 'John Doe',
        note: 'Good',
        grade: 8,
      },
    });

    render(
      <MemoryRouter>
        <TestStudentDetails />
      </MemoryRouter>
    );
    const updateButton = await screen.findByTestId('update-button');

    const gradeInput = screen
      .getByTestId('grade-input')
      .querySelector('input') as HTMLInputElement;
    await userEvent.clear(gradeInput);
    await userEvent.type(gradeInput, '11');

    await userEvent.click(updateButton);

    await screen.findByTestId('error-message');
    expect(screen.getByTestId('error-message').textContent).toBe(
      'Grade must be between 0 and 10'
    );
  });

  it('renders no photo message when testPhoto is not available', async () => {
    const mockGetStudentFromTest = jest.spyOn(
      require('app/src/hooks/useTestActions').useTestActions(),
      '_getStudentFromTest'
    );
    mockGetStudentFromTest.mockResolvedValueOnce({
      data: {
        studentName: 'John Doe',
        note: 'Good',
        grade: 8,
        testPhoto: null,
      },
    });

    render(
      <MemoryRouter>
        <TestStudentDetails />
      </MemoryRouter>
    );

    expect((await screen.findByTestId('no-photo-message')).textContent).toBe(
      'No photo saved for this test.'
    );
  });

  it('renders test photo when available', async () => {
    const mockGetStudentFromTest = jest.spyOn(
      require('app/src/hooks/useTestActions').useTestActions(),
      '_getStudentFromTest'
    );
    mockGetStudentFromTest.mockResolvedValueOnce({
      data: {
        studentName: 'John Doe',
        note: 'Good',
        grade: 8,
        testPhoto: 'https://example.com/test-photo.jpg',
      },
    });

    render(
      <MemoryRouter>
        <TestStudentDetails />
      </MemoryRouter>
    );

    const testPhoto = await screen.findByTestId('test-photo');
    expect(testPhoto).toHaveAttribute(
      'src',
      'https://example.com/test-photo.jpg'
    );
  });
});
