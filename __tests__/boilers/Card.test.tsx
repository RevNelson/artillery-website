import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Card, CardPropsTypes } from "./components/Card"
import { PetsContext } from "./components/Pets"

import catsData from "./mocks/cats.json"

const name = "Gera"
const phone = "111-111-1111"
const email = "michael@gmail.com"
const image = {
  url: "https://media.istockphoto.com/photos/scottish-fold-shorthair-cat-resting-on-chair-picture-id468382096?b=1&k=20&m=468382096&s=170667a&w=0&h=By7iGbV7dVscBWiMCsZt_zuIX6nOfqmDqhKq8oR2Rq8=",
  alt: "cute cat",
}
const gender = "female"
const color = "gray"

const cardProps = {
  name,
  phone,
  email,
  image,
  favored: false,
  gender,
  color,
}

const renderCard = (props: CardPropsTypes) => {
  render(
    <PetsContext.Provider value={{ cats: catsData, setCats: () => {} }}>
      <Card {...props} />
    </PetsContext.Provider>,
  )
}

describe("Card", () => {
  describe("Basic Elements", () => {
    beforeEach(() => {
      renderCard(cardProps)
    })

    it("Should show name of cat.", () => {
      expect(
        screen.getByRole("heading", {
          name,
        }),
      ).toBeInTheDocument()
    })

    it("Should show phone number.", () => {
      expect(screen.getByText(phone)).toBeInTheDocument()
    })

    it("Should show email.", () => {
      expect(screen.getByText(email)).toBeInTheDocument()
    })

    it("Should show image with correct source.", () => {
      expect((screen.getByAltText(image.alt) as HTMLImageElement).src).toBe(
        image.url,
      )
    })
  })

  it("Should show outlined heart.", () => {
    renderCard(cardProps)

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument()
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument()
  })

  it("Should show filled heart.", () => {
    renderCard({ ...cardProps, favored: true })

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument()
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument()
  })

  it("Should toggle heart status.", async () => {
    renderCard(cardProps)

    await userEvent.click(screen.getByRole("button"))
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument()
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument()
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument()
  })
})
