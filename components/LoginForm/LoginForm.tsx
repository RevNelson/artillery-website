import { FormEventHandler, useEffect } from "react"
import { useRouter } from "next/dist/client/router"
import shallow from "zustand/shallow"
import LockClosedIcon from "@heroicons/react/solid/LockClosedIcon"

import useFormFields from "@lib/hooks/useFormFields"
import useLogin from "@lib/hooks/auth/useLogin"
import useStore from "@lib/hooks/useStore"

import Link from "@components/Link"

// ####
// #### Types
// ####

type LoginFormProps = {
  modalRef?: string
  setOpen?: (open: boolean) => void
}

// ####
// #### Component
// ####

const LoginForm = ({ modalRef, setOpen }: LoginFormProps) => {
  const router = useRouter()

  const { loggedIn, error } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      error: state.auth.errors.login,
    }),
    shallow,
  )

  const { login } = useLogin()

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    if (fields.email && fields.password) {
      const cookiesInput = {
        login: fields.email,
        password: fields.password,
        rememberMe: true,
      }

      const jwtInput = {
        username: cookiesInput.login,
        password: cookiesInput.password,
      }

      await login({ jwtInput, cookiesInput })
    }
  }

  useEffect(() => {
    if (loggedIn) {
      setOpen && setOpen(false)
    }
  }, [loggedIn, setOpen])

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-700">
              Sign in to your account
            </h2>
            <div className="mt-2 flex justify-center text-sm text-gray-600">
              <div>
                <span className="pr-0.5">Or</span>
              </div>
              <div onClick={() => setOpen && setOpen(false)}>
                <Link
                  href={`/register${
                    router.query?.redirect
                      ? `?redirect=${router.query.redirect}`
                      : ""
                  }`}
                  className="font-medium text-blue-main hover:text-green-main"
                >
                  <span>click here to register</span>
                </Link>
              </div>
              <span>.</span>
            </div>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="username"
                  ref={modalRef}
                  autoComplete="email"
                  required
                  onChange={handleFieldChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  minLength={8}
                  maxLength={32}
                  required
                  onChange={handleFieldChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <div className="text-sm text-center text-red-600">
                {error}&nbsp;
              </div>
            </div>

            <div className="text-sm text-center">
              <Link
                href="/reset-password"
                className="font-medium text-blue-main hover:text-green-main"
              >
                Forgot your password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-main hover:bg-green-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-main"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-gray-300 group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginForm
