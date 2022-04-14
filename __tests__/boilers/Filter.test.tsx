import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Filter } from "./components/Filter"

describe("Filter", () => {
  beforeEach(() => {
    render(<Filter filters={{}} setFilters={() => {}} />)
  })

  it("Should be able to change value of favorite select.", async () => {
    const selectElement = screen.getByLabelText(
      /favorite/i,
    ) as HTMLSelectElement

    expect(selectElement.value).toBe("any")

    await userEvent.selectOptions(selectElement, "favorite")
    expect(selectElement.value).toBe("favorite")

    await userEvent.selectOptions(selectElement, "not favorite")
    expect(selectElement.value).toBe("not favorite")
  })

  it("Should be able to change value of gender select.", async () => {
    const selectElement = screen.getByLabelText(/gender/i) as HTMLSelectElement

    expect(selectElement.value).toBe("any")

    await userEvent.selectOptions(selectElement, "male")
    expect(selectElement.value).toBe("male")

    await userEvent.selectOptions(selectElement, "female")
    expect(selectElement.value).toBe("female")
  })
})
