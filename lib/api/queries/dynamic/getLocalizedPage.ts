import { gql } from "@apollo/client/core"
import { pageCommonFragment } from "@lib/api/queries/fragments/common"
import { i18n } from "@lib/i18n/config"

type PropsType = {
  slug: string
  locale?: string
  acfFields?: string
}

const getLocalizedPage = ({
  locale = i18n.defaultLocale,
  slug,
  acfFields,
}: PropsType) => {
  return gql`
query get_${slug} {
  artilleryPages(where: { wpmlLanguage: "${locale}", name: "${slug}" }) {
    nodes {
      ${pageCommonFragment}
      content
      ${acfFields || ""}
    }
  }
}
`
}

export default getLocalizedPage
