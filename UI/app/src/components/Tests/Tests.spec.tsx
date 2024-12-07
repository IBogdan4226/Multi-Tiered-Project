import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as MemoryRouter } from 'react-router-dom';
import { Tests } from './Tests';

const mockGetTests = jest.fn();
jest.mock('app/src/hooks/useTestActions', () => ({
  useTestActions: () => ({
    _getTests: mockGetTests,
  }),
}));

describe('Tests Component', () => {
  it('renders the filter input and create test button', () => {
    mockGetTests.mockResolvedValue([]);
    render(
      <MemoryRouter>
        <Tests />
      </MemoryRouter>
    );

    expect(screen.getByTestId('name-filter'));
    expect(screen.getByTestId('create-test-button'));
    expect(screen.getByTestId('no-tests-message'));
  });

  it('fetches and displays tests when available', async () => {
    const tests = [
      { id: '1', name: 'Test 1' },
      { id: '2', name: 'Test 2' },
    ];
    mockGetTests.mockResolvedValue(tests);

    render(
      <MemoryRouter>
        <Tests />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('tests-list'));
      expect(screen.getByText('Test 1'));
      expect(screen.getByText('Test 2'));
    });
  });

  it('debounces name filter changes and fetches tests', async () => {
    mockGetTests.mockResolvedValue([]);
    render(
      <MemoryRouter>
        <Tests />
      </MemoryRouter>
    );

    const nameFilter = screen
      .getByTestId('name-filter')
      .querySelector('input') as HTMLInputElement;
    fireEvent.change(nameFilter, { target: { value: 'Math' } });

    await waitFor(() => expect(mockGetTests).toHaveBeenCalledWith('Math'));
  });
});
