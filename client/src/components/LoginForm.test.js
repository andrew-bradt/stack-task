import {render, screen} from '@testing-library/react';
import LoginForm from './LoginForm';

it('Should have a username, password field, and login button',()=>{
    render(<LoginForm/>);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const login = screen.getByText(/login/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(login).toBeInTheDocument();
})
