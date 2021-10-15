import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm';

it('Should have a username, password field, and register button',()=>{
    render(<SignUpForm/>);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const register = screen.getByText(/Register/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(register).toBeInTheDocument();
})

// it('Should allow user to submit email and password',()=>{
//     render(<SignUpForm/>);

//     const email = screen.getByLabelText(/email/i);
//     const password = screen.getByLabelText(/password/i);
//     const register = screen.getByText(/Register/i);

//     userEvent.type(email,'user1@gmail.com');
//     userEvent.type(password,'password');
//     userEvent.click(register);
// })
