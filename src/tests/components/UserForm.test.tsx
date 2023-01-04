import { render } from '@testing-library/react';
import UserForm from '../../components/UserForm';

describe('UserForm Tests', () => {
  it('should render user form', () => {
    render(<UserForm />);
  });
});
