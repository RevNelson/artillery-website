import { render, screen } from "@testing-library/react"

import { Cards } from "./components/Cards"
import { PetsContext } from "./components/Pets"

import catsData from "./mocks/cats.json"

describe("Cards", () => {
  it("Should render five cat cards.", () => {
    render(
      <PetsContext.Provider
        value={{
          cats: catsData,
          setCats: () => {},
        }}
      >
        <Cards />
      </PetsContext.Provider>,
    )

    expect(screen.getAllByRole("article").length).toBe(5)
  })
})
