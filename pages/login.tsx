import { ReactElement, useEffect } from "react"
import { GetStaticProps, InferGetStaticPropsType } from "next/types"
import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/dist/client/router"

// import useAuth from "@lib/hooks/useAuth"
import withUrql from "@api/urql/hoc"
import urql from "@api/urql/serverClient"
import getLocalizedPage from "@api/queries/dynamic/getLocalizedPage"

import Layout from "@components/Layout"
import useStore from "@lib/hooks/useStore"

// import PageTitle from "@components/PageTitle"

// ####
// #### Dynamic Imports
// ####

const importOpts = {
  ssr: false,
  suspense: false,
}

const LoginForm = dynamic(() => import("@components/LoginForm"), importOpts)

const Page = ({
  data,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const loggedIn = useStore(state => state.auth.loggedIn)

  useEffect(() => {
    if (loggedIn) {
      const rederict = (router.query?.redirect as string) || undefined
      router.push(rederict || "/")
    }
  }, [loggedIn, router])

  return (
    <>
      <Layout>
        {/* <PageTitle
        title="Login"
        description="Login to your account to see past orders."
        banner={false}
      /> */}

        <LoginForm />
      </Layout>
    </>
  )
}

// ####
// #### GraphQL
// ####

export default withUrql(Page)

// ####
// #### Data Fetching
// ####

export const getStaticProps: GetStaticProps = async context => {
  // const client = initializeApollo({})
  const { client } = urql()
  const locale = context.locale
  const slug = "login"

  const acfFields = `ACF${slug} {  }`

  const query = getLocalizedPage({ locale, slug })

  const { data, error } = await client!.query(query).toPromise()

  const staticProps = { data: data || null, error: error || null }

  // addApolloState(client, staticProps)

  return {
    props: { ...staticProps },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }
}
