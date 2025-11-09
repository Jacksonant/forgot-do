import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import authReducer from './store/authSlice';
import tasksReducer from './store/tasksSlice';

const createTestStore = () => configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

describe('Task Management Flow', () => {
  it('should complete full user journey: login, create, edit, delete, toggle, search, logout, and re-login', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // 1. Login
    const idInput = screen.getByPlaceholderText(/id/i);
    const nameInput = screen.getByPlaceholderText(/name/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(idInput, 'testuser');
    await user.type(nameInput, 'Test User');
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/test user/i)).toBeInTheDocument();
    });

    // 2. Create task
    const newTaskButton = screen.getByRole('button', { name: /new task/i });
    await user.click(newTaskButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    const taskInput = screen.getByLabelText(/task name input/i);
    await user.type(taskInput, 'Buy groceries');
    const modal = screen.getByRole('dialog');
    const submitButton = modal.querySelector('button[type="submit"]');
    await user.click(submitButton!);

    await waitFor(() => {
      const taskRow = screen.getByRole('listitem');
      const taskName = taskRow.querySelector('.task-name');
      expect(taskName).toHaveTextContent('Buy groceries');
    });

    // 3. Edit task
    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    await user.click(editButton);

    const editInput = screen.getByDisplayValue('Buy groceries');
    await user.clear(editInput);
    await user.type(editInput, 'Buy groceries and fruits');
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);

    await waitFor(() => {
      const taskRow = screen.getByRole('listitem');
      const taskName = taskRow.querySelector('.task-name');
      expect(taskName).toHaveTextContent('Buy groceries and fruits');
    });

    // 4. Toggle task state
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    // 5. Create another task for search test
    const createButton = screen.getByRole('button', { name: /create new task/i });
    await user.click(createButton);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    await user.type(screen.getByLabelText(/task name input/i), 'Read a book');
    const modal2 = screen.getByRole('dialog');
    const submitButton2 = modal2.querySelector('button[type="submit"]');
    await user.click(submitButton2!);

    await waitFor(() => {
      const taskNames = screen.getAllByRole('listitem').map(item => item.querySelector('.task-name')?.textContent);
      expect(taskNames).toContain('Read a book');
    });

    // 6. Search task
    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'book');

    await waitFor(() => {
      const taskNames = screen.getAllByRole('listitem').map(item => item.querySelector('.task-name')?.textContent);
      expect(taskNames).toContain('Read a book');
      expect(taskNames).not.toContain('Buy groceries and fruits');
    });

    await user.clear(searchInput);

    // 7. Delete task
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    await waitFor(() => {
      const taskNames = screen.getAllByRole('listitem').map(item => item.querySelector('.task-name')?.textContent);
      expect(taskNames).not.toContain('Read a book');
    });

    // 8. Logout
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/id/i)).toBeInTheDocument();
    });

    // 9. Login with same user to verify task persistence
    await user.type(screen.getByPlaceholderText(/id/i), 'testuser');
    await user.type(screen.getByPlaceholderText(/name/i), 'Test User');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      const taskNames = screen.getAllByRole('listitem').map(item => item.querySelector('.task-name')?.textContent);
      expect(taskNames).toContain('Buy groceries and fruits');
      expect(taskNames).not.toContain('Read a book');
    });
  });
});
