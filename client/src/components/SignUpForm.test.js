import {render, screen} from '@testing-library/react';
import SignUpForm from './SignUpForm';

it('Should have a username, password field, and submit button',()=>{
    render(<SignUpForm/>);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const register = screen.getByText(/Register/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(register).toBeInTheDocument();
})
