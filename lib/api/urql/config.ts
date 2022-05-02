import fetch from "./fetch"

const clientOptions = {
  url: process.env.NEXT_PUBLIC_API_BASE_URL || "/graphql",
  fetch,
}

export default clientOptions
