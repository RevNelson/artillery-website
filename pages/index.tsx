// import dynamic from "next/dynamic";
import { ReactElement } from "react"
import Link from "next/link"
import { GetStaticProps, InferGetStaticPropsType } from "next/types"

import { initializeApollo, addApolloState } from "@lib/apollo/client"
import useLocale from "@lib/hooks/useLocale"
import { ArtilleryPage } from "@api/gql/types"
import getLocalizedPage from "@api/queries/dynamic/getLocalizedPage"
import { heroFragment } from "@api/queries/hero"

import Layout from "@components/Layout"

// ####
// #### Dynamic Imports
// ####

// ####
// #### Component
// ####

export default function Page({
  data,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { locale, locales, langs, setLocale } = useLocale()

  const page = (data?.artilleryPages.nodes[0] as ArtilleryPage) || null

  return (
    <div className="font-sans">
      <nav>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content || "" }}></div>
      {locales.map(locale => {
        return (
          <button key={locale + "key"} onClick={() => setLocale(locale)}>
            {langs[locale].name}
          </button>
        )
      })}
    </div>
  )
}

// ####
// #### Layout
// ####

Page.getLayout = function getLayout(page: ReactElement) {
  const data = page.props.data || null
  const pageData = (data?.artilleryPages.nodes[0] as ArtilleryPage) || null
  const hero = pageData?.ACFhome?.hero

  return <Layout hero={hero}>{page}</Layout>
}

// ####
// #### Data Fetching
// ####

export const getStaticProps: GetStaticProps = async context => {
  const client = initializeApollo({})
  const locale = context.locale
  const slug = "home"

  const acfFields = `ACF${slug} { ${heroFragment} }`

  const query = getLocalizedPage({ locale, slug, acfFields })

  const { data, loading, error } = await client.query({
    query,
  })

  const staticProps = { data: data || null, loading, error: error || null }

  addApolloState(client, staticProps)

  return {
    props: { ...staticProps },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }
}
