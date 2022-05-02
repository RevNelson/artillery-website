import { useEffect } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/router"

import useStore from "@lib/hooks/useStore"

import Layout from "@components/Layout"
import withUrql from "@api/urql/hoc"

// import PageTitle from "@components/PageTitle"

// ####
// #### Dynamic Imports
// ####

const importOpts = {
  ssr: false,
  suspense: false,
}

const RegisterForm = dynamic(
  () => import("@components/RegisterForm"),
  importOpts,
)

// ####
// #### Component
// ####

const Register = ({}) => {
  const router = useRouter()

  const loggedIn = useStore(state => state.auth.loggedIn)

  useEffect(() => {
    if (loggedIn) {
      router.push("/shop")
    }
  }, [loggedIn, router])

  return (
    <Layout>
      {/* <PageTitle
        title="Register"
        description="Register an account to track future orders."
        banner={false}
      /> */}

      <RegisterForm />
    </Layout>
  )
}

// ####
// #### API
// ####

export default withUrql(Register)
