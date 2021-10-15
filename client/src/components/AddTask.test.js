import {render, screen} from '@testing-library/react';
import AddTask from './AddTask';

it('Should have a title, description, and Add Task button',()=>{
    render(<AddTask/>);

    const title = screen.getByLabelText(/title/i);
    const description = screen.getByLabelText(/description/i);
    const submit = screen.getByText(/Submit/i);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument(); 
    expect(submit).toBeInTheDocument();
})
