import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import InputForm from "./components/InputForm"

// Test Values
const email = "michael@gmail.com"
const password = "12345"

type TypeIntoFormPropsType = {
  email?: string
  password?: string
  confirmPassword?: string
}

const typeIntoForm = async ({
  email,
  password,
  confirmPassword,
}: TypeIntoFormPropsType) => {
  // Find elements
  const emailInputElement: HTMLInputElement = screen.getByRole("textbox")
  const passwordInputElement: HTMLInputElement =
    screen.getByLabelText("Password")
  const confirmPasswordInputElement: HTMLInputElement =
    screen.getByLabelText(/confirm password/i)

  // Type values
  email && (await userEvent.type(emailInputElement, email))
  password && (await userEvent.type(passwordInputElement, password))
  confirmPassword &&
    (await userEvent.type(confirmPasswordInputElement, confirmPassword))

  // Return elements
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  }
}

const clickSubmit = async () => {
  // Find elements
  const submitButtonElement = screen.getByRole("button", { name: /submit/i })

  // User Events
  await userEvent.click(submitButtonElement)
}

describe("Boiler Input", () => {
  beforeEach(() => {
    // Render component we want to test
    render(<InputForm />)
  })

  it("Inputs should be initially empty", () => {
    // Find elements
    const emailInputElement: HTMLInputElement = screen.getByRole("textbox", {
      name: /email/i,
    })
    const passwordInputElement: HTMLInputElement =
      screen.getByLabelText("Password")
    const confirmPasswordInputElement: HTMLInputElement =
      screen.getByLabelText(/confirm password/i)

    // Assertions
    expect(emailInputElement.value).toBe("")
    expect(passwordInputElement.value).toBe("")
    expect(confirmPasswordInputElement.value).toBe("")
  })

  it("Should be able to type an email", async () => {
    const { emailInputElement } = await typeIntoForm({ email })

    expect(emailInputElement.value).toBe(email)
  })

  it("Should be able to type a password", async () => {
    const { passwordInputElement } = await typeIntoForm({ password })

    expect(passwordInputElement.value).toBe(password)
  })

  it("Should be able to type a password confirmation", async () => {
    const { confirmPasswordInputElement } = await typeIntoForm({
      confirmPassword: password,
    })

    expect(confirmPasswordInputElement.value).toBe(password)
  })

  describe("Error Handling", () => {
    it("Should show email error message only after submitting invalid email", async () => {
      // Test values
      const errorMessage = /the email you input is invalid/i

      // Pre Assertions
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()

      // User Events
      await typeIntoForm({ email: "michaelgmail.com" })
      await clickSubmit()

      // Assertions
      expect(screen.queryByText(errorMessage)).toBeInTheDocument()
    })

    it("Should show password error if password is less than 5 characters", async () => {
      // Test values
      const errorMessage =
        /the password you entered should be 5 or more characters/i

      // Pre Assertions
      await typeIntoForm({ email, password: "123" })
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
      await clickSubmit()

      // Assertions
      expect(screen.queryByText(errorMessage)).toBeInTheDocument()
    })

    it("Should show confirm password error if passwords don't match", async () => {
      // Test values
      const errorMessage = /the passwords don't match. try again/i

      // Pre Assertions
      await typeIntoForm({ email, password })
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()

      // User Events
      await typeIntoForm({ confirmPassword: "123456" })
      await clickSubmit()

      // Assertions
      expect(screen.queryByText(errorMessage)).toBeInTheDocument()
    })

    it("Should show no error message if every input is valid", async () => {
      // User Events
      await typeIntoForm({ email, password, confirmPassword: password })
      await clickSubmit()

      // Assertions
      expect(
        screen.queryByText(/the email you input is invalid/i),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(
          /the password you entered should be 5 or more characters/i,
        ),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/the passwords don't match. try again/i),
      ).not.toBeInTheDocument()
    })
  })
})
