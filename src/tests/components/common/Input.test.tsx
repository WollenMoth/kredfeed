import { render, screen } from '@testing-library/react';
import Input from '../../../components/common/Input';

describe('Input Tests', () => {
  it('should not render alert if there are not errors', () => {
    render(
      <Input
        id="username"
        label="Username"
        error=""
        value=""
        type="text"
        onChange={() => {}}
      />
    );

    const alert = screen.queryByRole('alert');
    expect(alert).not.toBeInTheDocument();
  });

  it('should render alert if there are errors', () => {
    render(
      <Input
        id="username"
        label="Username"
        error="Username is required"
        value=""
        type="text"
        onChange={() => {}}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});
