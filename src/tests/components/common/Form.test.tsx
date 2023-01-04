import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import TestForm from './TestForm';

describe('Form Tests', () => {
  let name = 'name';

  const fill = () => {
    const nameInput = screen.getByLabelText('Name');
    const ageInput = screen.getByLabelText('Age');

    userEvent.type(nameInput, name || '{tab}');
    userEvent.type(ageInput, '30');
  };

  const submit = () => userEvent.click(screen.getByText('Submit'));

  it('should submit form if no errors', () => {
    const logSpy = jest.spyOn(console, 'log');

    render(<TestForm />);

    fill();
    submit();

    expect(logSpy).toHaveBeenCalledWith('Submitted');
  });

  it('should not submit form if errors', () => {
    const logSpy = jest.spyOn(console, 'log');

    render(<TestForm />);

    submit();

    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should display errors', () => {
    name = 'a';

    render(<TestForm />);

    fill();

    const error = screen.getByText(/must be at least 3 characters long/i);
    expect(error).toBeInTheDocument();
  });
});
