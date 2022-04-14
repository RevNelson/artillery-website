import { ChangeEvent, MouseEvent, useState } from "react"
import validator from "validator"

type SubmitEventType = MouseEvent<HTMLButtonElement>

const InputForm = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleClick = (e: SubmitEventType) => {
    e.preventDefault()
    if (!validator.isEmail(input.email)) {
      setError("The email you input is invalid.")
    } else if (input.password.length < 5) {
      setError("The password you entered should be 5 or more characters.")
    } else if (input.password !== input.confirmPassword) {
      setError("The passwords don't match. Try again.")
    }
  }

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
  )
}

export default InputForm
