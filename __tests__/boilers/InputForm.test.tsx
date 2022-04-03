import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Boiler Input", () => {
  it("Inputs should be null", () => {
    // Render component we want to test
    render(<InputForm />);

    // Find elements
    const emailInputElement = screen.getByRole("textbox") as HTMLInputElement;
    const passwordInputElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    const confirmPasswordInputElement = screen.getByLabelText(
      /confirm password/i
    ) as HTMLInputElement;

    // Assertions
    expect(emailInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
    expect(confirmPasswordInputElement.value).toBe("");
  });

  it("Should be able to type an email", async () => {
    // Render component we want to test
    render(<InputForm />);

    // Test values
    const testEmail = "michael@gmail.com";

    // Find elements
    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;

    // User Events
    await userEvent.type(emailInputElement, testEmail);

    // Assertions
    expect(emailInputElement.value).toBe(testEmail);
  });

  it("Should be able to type a password", async () => {
    // Render component we want to test
    render(<InputForm />);

    // Test values
    const testPassword = "password";

    // Find elements
    const passwordInputElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;

    // User Events
    await userEvent.type(passwordInputElement, testPassword);

    // Assertions
    expect(passwordInputElement.value).toBe(testPassword);
  });

  it("Should be able to type a password confirmation", async () => {
    // Render component we want to test
    render(<InputForm />);

    // Test values
    const testPassword = "password";

    // Find elements
    const confirmPasswordInputElement = screen.getByLabelText(
      /confirm password/i
    ) as HTMLInputElement;

    // User Events
    await userEvent.type(confirmPasswordInputElement, testPassword);

    // Assertions
    expect(confirmPasswordInputElement.value).toBe(testPassword);
  });

  it("Should show email error message only after submitting invalid email", async () => {
    // Render component we want to test
    render(<InputForm />);

    // Test values
    const testEmail = "michaelgmail.com";
    const errorMessage = /the email you input is invalid/i;

    // Find elements
    const emailErrorElement = screen.queryByText(errorMessage);
    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const submitButtonElement = screen.getByRole("button", { name: /submit/i });

    // Pre Assertions

    expect(emailErrorElement).not.toBeInTheDocument();

    // User Events
    await userEvent.type(emailInputElement, testEmail);
    await userEvent.click(submitButtonElement);

    // Assertions
    const emailErrorElementAgain = screen.queryByText(errorMessage);
    expect(emailErrorElementAgain).toBeInTheDocument();
  });

  it("Should show password error if password is less than 5 characters", async () => {
    // Render component we want to test
    render(<InputForm />);

    // Test values
    const testEmail = "michael@gmail.com";
    const errorMessage =
      /the password you entered should be 5 or more characters/i;

    // Find elements
    const passwordErrorElement = screen.queryByText(errorMessage);
    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const submitButtonElement = screen.getByRole("button", { name: /submit/i });
    const passwordInputElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;

    // Pre Assertions
    await userEvent.type(emailInputElement, testEmail);
    await userEvent.type(passwordInputElement, "123");
    expect(passwordErrorElement).not.toBeInTheDocument();

    // Assertions
    await userEvent.click(submitButtonElement);
    const passwordErrorElementAgain = screen.queryByText(errorMessage);
    expect(passwordErrorElementAgain).toBeInTheDocument();
  });

  it("Should show confirm password error if passwords don't match", async () => {
    // Render component we want to test
    render(<InputForm />);

    // Test values
    const testEmail = "michael@gmail.com";
    const errorMessage = /the passwords don't match. try again/i;

    // Find elements
    const confirmpasswordErrorElement = screen.queryByText(errorMessage);
    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const submitButtonElement = screen.getByRole("button", { name: /submit/i });
    const passwordInputElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    const confirmPasswordInputElement = screen.getByLabelText(
      /confirm password/i
    ) as HTMLInputElement;

    // Pre Assertions
    await userEvent.type(emailInputElement, testEmail);
    await userEvent.type(passwordInputElement, "12345");
    expect(confirmpasswordErrorElement).not.toBeInTheDocument();

    // User Events
    await userEvent.type(confirmPasswordInputElement, "123456");
    await userEvent.click(submitButtonElement);

    // Assertions
    const confirmPasswordErrorElementAgain = screen.queryByText(errorMessage);
    expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
  });

  it("Should show no error message if every input is valid", async () => {
    // Render component we want to test
    render(<InputForm />);

    // Test values
    const testEmail = "michael@gmail.com";
    const testPassword = "12345";
    const emailErrorMessage = /the email you input is invalid/i;
    const passwordErrorMessage =
      /the password you entered should be 5 or more characters/i;
    const confirmPasswordErrorMessage = /the passwords don't match. try again/i;

    // Find elements
    const emailInputElement = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const submitButtonElement = screen.getByRole("button", { name: /submit/i });
    const passwordInputElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    const confirmPasswordInputElement = screen.getByLabelText(
      /confirm password/i
    ) as HTMLInputElement;

    // User Events
    await userEvent.type(emailInputElement, testEmail);
    await userEvent.type(passwordInputElement, testPassword);
    await userEvent.type(confirmPasswordInputElement, testPassword);
    await userEvent.click(submitButtonElement);

    // Assertions
    const emailErrorElementAgain = screen.queryByText(emailErrorMessage);
    const passwordErrorElementAgain = screen.queryByText(passwordErrorMessage);
    const confirmPasswordErrorElementAgain = screen.queryByText(
      confirmPasswordErrorMessage
    );
    expect(emailErrorElementAgain).not.toBeInTheDocument();
    expect(passwordErrorElementAgain).not.toBeInTheDocument();
    expect(confirmPasswordErrorElementAgain).not.toBeInTheDocument();
  });
});

//
// COMPONENT
//

import { ChangeEvent, MouseEvent, useState } from "react";
import validator from "validator";

type SubmitEventType = MouseEvent<HTMLButtonElement>;

const InputForm = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClick = (e: SubmitEventType) => {
    e.preventDefault();
    if (!validator.isEmail(input.email)) {
      setError("The email you input is invalid.");
    } else if (input.password.length < 5) {
      setError("The password you entered should be 5 or more characters.");
    } else if (input.password !== input.confirmPassword) {
      setError("The passwords don't match. Try again.");
    }
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </>
  );
};
