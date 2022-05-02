import { css } from "twin.macro"

import interFonts from "./inter"

const fonts = (fontsCDN: string) => {
  return css`
    ${interFonts(fontsCDN)}
  `
}

export default fonts
