import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

const mockRegister = jest.fn();

const renderRegisterForm = () => {
  render(<RegisterForm onSubmitForm={mockRegister} isLoading={false} />);
};

describe('RegisterForm', () => {
  it('displays error messages for empty form inputs', async () => {
    renderRegisterForm();

    fireEvent.submit(screen.getByRole('button', { name: 'register.submitBtn' }));

    await waitFor(() => {
      expect(screen.getAllByText(/errorMessages.form.required/i)).toHaveLength(3);
    });
  });

  it('displays error message when given passwords do not match', async () => {
    renderRegisterForm();

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText('register.passwordLabel'), 'password123');
    await userEvent.type(screen.getByLabelText('register.confirmPasswordLabel'), 'someotherpassword123');

    fireEvent.submit(screen.getByRole('button', { name: 'register.submitBtn' }));

    await waitFor(() => {
      expect(mockRegister).not.toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getAllByText(/errorMessages.form.differentPasswords/i)).toHaveLength(1);
    });
  });

  it('renders form elements and submits the form for correct inputs', async () => {
    renderRegisterForm();

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText('register.passwordLabel'), 'password123');
    await userEvent.type(screen.getByLabelText('register.confirmPasswordLabel'), 'password123');

    fireEvent.submit(screen.getByRole('button', { name: 'register.submitBtn' }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
