import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import { Pets } from "./components/Pets"

import catsData from "./mocks/cats.json"

const server = setupServer(
  rest.get("http://localhost:12345/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsData))
  }),
)

beforeEach(() => render(<Pets />))
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Pets", () => {
  it("Should render five cat cards.", async () => {
    const cards = await screen.findAllByRole("article")

    expect(cards.length).toBe(5)
  })

  it("Should filter for male cats.", async () => {
    const cards = await screen.findAllByRole("article")
    await userEvent.selectOptions(screen.getByLabelText(/gender/i), "male")
    expect(screen.getAllByRole("article")).toStrictEqual([cards[1], cards[3]])
  })

  it("Should filter for female cats.", async () => {
    const cards = await screen.findAllByRole("article")
    await userEvent.selectOptions(screen.getByLabelText(/gender/i), "female")
    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[0],
      cards[2],
      cards[4],
    ])
  })

  it("Should filter for favored cats.", async () => {
    const cards = await screen.findAllByRole("article")
    await userEvent.click(within(cards[0]).getByRole("button"))
    await userEvent.click(within(cards[3]).getByRole("button"))

    await userEvent.selectOptions(
      screen.getByLabelText(/favorite/i),
      "favorite",
    )

    expect(screen.getAllByRole("article")).toStrictEqual([cards[0], cards[3]])
  })

  it("Should filter for not favored cats.", async () => {
    const cards = await screen.findAllByRole("article")
    await userEvent.click(within(cards[0]).getByRole("button"))
    await userEvent.click(within(cards[3]).getByRole("button"))

    await userEvent.selectOptions(
      screen.getByLabelText(/favorite/i),
      "not favorite",
    )

    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[1],
      cards[2],
      cards[4],
    ])
  })

  it("Should filter for favoured male cats.", async () => {
    const cards = await screen.findAllByRole("article")
    await userEvent.click(within(cards[0]).getByRole("button"))
    await userEvent.click(within(cards[3]).getByRole("button"))

    await userEvent.selectOptions(
      screen.getByLabelText(/favorite/i),
      "favorite",
    )

    await userEvent.selectOptions(screen.getByLabelText(/gender/i), "male")

    expect(screen.getAllByRole("article")).toStrictEqual([cards[3]])
  })
})
