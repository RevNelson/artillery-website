import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import { gql } from "@apollo/client/core";

import { initializeApollo, addApolloState } from "@lib/apollo/client";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log("DATA", props);

  return (
    <>
      <nav>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </>
  );
}

// ####
// #### Data Fetching
// ####

export const getStaticProps: GetStaticProps = async (context) => {
  const client = initializeApollo({});

  const { data, loading } = await client.query({
    query: gql`
      query NewQuery {
        menus(where: { language: "uk" }) {
          nodes {
            name
            slug
            language
          }
        }
      }
    `,
  });

  const staticProps = { data, loading };

  addApolloState(client, staticProps);

  return {
    props: staticProps,
    revalidate: 4 * 60 * 60, // Every 4 hours
  };
};
