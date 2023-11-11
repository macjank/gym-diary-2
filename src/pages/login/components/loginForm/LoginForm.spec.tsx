import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

const mockPasswordLogin = jest.fn();
const mockGoogleLogin = jest.fn();

const renderLoginForm = () => {
  render(<LoginForm onPasswordLogin={mockPasswordLogin} onGoogleLogin={mockGoogleLogin} isLoading={false} />);
};

describe('LoginForm', () => {
  it('renders form elements and submits the form', async () => {
    renderLoginForm();

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    fireEvent.submit(screen.getByRole('button', { name: 'login.submitBtn' }));

    await waitFor(() => {
      expect(mockPasswordLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('displays error messages for invalid form input', async () => {
    renderLoginForm();

    fireEvent.submit(screen.getByRole('button', { name: 'login.submitBtn' }));

    await waitFor(() => {
      expect(screen.getAllByText(/errorMessages.form.required/i)).toHaveLength(2);
    });
  });

  it('calls onGoogleLogin when the Google login button is clicked', async () => {
    renderLoginForm();

    await userEvent.click(screen.getByText(/login.googleLogin/i));

    expect(mockGoogleLogin).toHaveBeenCalled();
  });
});
