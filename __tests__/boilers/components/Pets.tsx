import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import axios from "axios"

import { Filter } from "./Filter"
import { Cards, CatWithIDType } from "./Cards"

import catsData from "../mocks/cats.json"

type PetsContextType = {
  cats: CatWithIDType[]
  setCats: Dispatch<SetStateAction<CatWithIDType[] | undefined>>
}

export const PetsContext = createContext<PetsContextType>({
  cats: catsData,
  setCats: () => {},
})

export const Pets = () => {
  const [cats, setCats] = useState<CatWithIDType[] | undefined>()
  const [filteredCats, setFilteredCats] = useState<
    CatWithIDType[] | undefined
  >()
  const [filters, setFilters] = useState({ gender: "any", favored: "any" })

  const fetchCats = async () => {
    const catsReturn = await axios.get("http://localhost:12345/cats")
    setCats(catsReturn.data as CatWithIDType[])
    setFilteredCats(catsReturn.data as CatWithIDType[])
  }

  useEffect(() => {
    !cats && fetchCats()
  }, [cats, fetchCats])

  useEffect(() => {
    let catsFiltered = [...(cats || [])]
    if (filters.gender !== "any") {
      catsFiltered = catsFiltered.filter(cat => cat.gender === filters.gender)
    }
    if (filters.favored !== "any") {
      catsFiltered = catsFiltered.filter(
        cat => cat.favored === (filters.favored === "favorite" ? true : false),
      )
    }
    setFilteredCats(catsFiltered)
  }, [cats, filters])

  return (
    <>
      <div className="container">
        <div className="app-container">
          <PetsContext.Provider
            value={{
              cats: filteredCats || catsData,
              setCats: setCats as () => void,
            }}
          >
            <Filter filters={filters} setFilters={setFilters} />
            {filteredCats && <Cards />}
          </PetsContext.Provider>
        </div>
      </div>
    </>
  )
}
