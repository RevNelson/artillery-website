import Link from "next/link";
import { gql } from "@apollo/client/core";

import initializeApollo from "@lib/apollo/client";
import addApolloState from "@lib/apollo/addApolloState";

export default function Home() {
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

export async function getStaticProps() {
  const client = initializeApollo({});

  const { data } = await client.query({
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

  console.log(data);

  const staticProps = {
    props: {},
    revalidate: 4 * 60 * 60, // Every 4 hours
  };

  addApolloState(client, staticProps);

  return staticProps;
}
