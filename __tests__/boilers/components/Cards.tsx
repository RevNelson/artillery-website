import { useContext } from "react"

import { Card, CardPropsTypes } from "./Card"
import { PetsContext } from "./Pets"

export type CatWithIDType = CardPropsTypes & { id: number }

export const Cards = () => {
  const { cats } = useContext(PetsContext)

  return (
    <>
      <div className="pet-cards-container">
        {cats.map((cat, index) => {
          const { id: key, ...catInfo } = cat
          return <Card key={cat.id} index={index} {...catInfo} />
        })}
      </div>
    </>
  )
}
