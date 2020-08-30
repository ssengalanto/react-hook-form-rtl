import React from 'react';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

import { SigninForm } from './SigninForm';

const email = faker.internet.email();
const password = faker.random.uuid();

describe('<SigninForm />', () => {
  beforeEach(() => {
    render(<SigninForm />);
  });

  it('should not display error when value is valid', async () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const form = screen.getByTestId('signin-form');

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(emailInput).toHaveProperty('value', email);
    expect(passwordInput).toHaveProperty('value', password);

    fireEvent.submit(form);

    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });

  it('should display matching error when email is invalid', async () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const form = screen.getByTestId('signin-form');

    userEvent.type(emailInput, 'test');
    userEvent.type(passwordInput, password);

    fireEvent.submit(form);

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByText(/Input must be a valid email address/i)).toBeInTheDocument();
  });

  it('should display required error when value is invalid', async () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const form = screen.getByTestId('signin-form');

    userEvent.type(emailInput, '');
    userEvent.type(passwordInput, '');

    fireEvent.submit(form);

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(screen.getByText(/Email field is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password field is required/i)).toBeInTheDocument();
  });

  it('should display matching error when password is less than the min characters', async () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const form = screen.getByTestId('signin-form');

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234');

    fireEvent.submit(form);

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
  });
});
