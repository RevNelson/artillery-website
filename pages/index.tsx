// import dynamic from "next/dynamic";
import Link from "next/link"
import { GetStaticProps, InferGetStaticPropsType } from "next/types"

import useLocale from "@lib/hooks/useLocale"
import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  ArtilleryPage,
  GetMainMenuDataDocument,
  GetUiStringsDocument,
} from "@api/gql/types"
import getLocalizedPage from "@api/queries/dynamic/getLocalizedPage"
import { heroFragment } from "@api/fragments/hero"

import Layout from "@components/Layout"

// ####
// #### Dynamic Imports
// ####

// ####
// #### Component
// ####

const Page = ({
  data,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale, langs, locales, setLocale } = useLocale()
  // const loggedIn = useStore(state => state.auth.loggedIn)

  const page = (data?.artilleryPages.nodes[0] as ArtilleryPage) || null
  const hero = page?.ACFhome?.hero

  const handleClick = async () => {
    // await getLocales()
  }

  return (
    <Layout hero={hero}>
      <div className="font-sans">
        <div>
          <button onClick={handleClick}>LOCO</button>
        </div>
        <nav>
          <Link href="/about">
            <a>About</a>
          </Link>
        </nav>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content || "" }}></div>
        {locales &&
          locales.map(locale => {
            if (locale)
              return (
                <button key={locale + "key"} onClick={() => setLocale(locale)}>
                  {langs[locale].name}
                </button>
              )
          })}
      </div>
    </Layout>
  )
}

// ####
// #### API
// ####

export default withUrql(Page)

// ####
// #### Data Fetching
// ####

export const getStaticProps: GetStaticProps = async context => {
  const { client, ssrCache } = urql()
  const locale = context.locale
  const slug = "home"

  const acfFields = `ACF${slug} { ${heroFragment} }`

  const query = getLocalizedPage({ locale, slug, acfFields })

  const { data, error } = await client!.query(query).toPromise()

  // Menu Data
  client && (await client.query(GetMainMenuDataDocument, { locale }))

  // UI Data
  client && (await client.query(GetUiStringsDocument, { id: `ui-${locale}` }))

  const props = {
    data: data || null,
    error: error || null,
    urqlState: ssrCache.extractData(),
    initStore: {
      lastUpdate: Date.now(),
      light: false,
    },
  }

  return {
    props,
    revalidate: 4 * 60 * 60, // Every 4 hours
  }
}
