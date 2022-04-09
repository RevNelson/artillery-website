import dynamic from "next/dynamic";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";

import { initializeApollo, addApolloState } from "@lib/apollo/client";
import useLocale from "@lib/hooks/useLocale";
import { ArtilleryPage } from "@api/gql/types";
import getLocalizedPage from "@api/queries/dynamic/getLocalizedPage";

// ####
// #### Dynamic Imports
// ####

const importOpts = {};

const FlagIcon = dynamic(() => import("@components/FlagIcon"), importOpts);

// ####
// #### Component
// ####

export default function Home({
  data,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { locale, setLocale } = useLocale();

  const page = data.artilleryPages.nodes[0] as ArtilleryPage;

  const acf = page.ACFhome;

  return (
    <div className="font-sans">
      <nav>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content || "" }}></div>
      <button onClick={() => setLocale("en")}>English</button>
      <button onClick={() => setLocale("uk")}>Ukrainian</button>
      <button onClick={() => setLocale("pl")}>Polish</button>
      <button onClick={() => setLocale("es")}>Spanish</button>
      {acf?.hero && <div>{acf.hero}</div>}
      <FlagIcon
        locale={locale}
        square={false}
        size={32}
        rounded={"rounded-lg"}
      />
    </div>
  );
}

// ####
// #### Data Fetching
// ####

export const getStaticProps: GetStaticProps = async (context) => {
  const client = initializeApollo({});
  const locale = context.locale;
  const slug = "home";

  const acfFields = `ACF${slug} { hero }`;

  const query = getLocalizedPage({ locale, slug, acfFields });

  const { data, loading, error } = await client.query({
    query,
  });

  const staticProps = { data, loading, error: error || null };

  addApolloState(client, staticProps);

  return {
    props: { ...staticProps },
    revalidate: 4 * 60 * 60, // Every 4 hours
  };
};
