import { useContext, useState } from "react";

import { PetsContext } from "./Pets";

import heartFilled from "./svgs/heartFilled.svg";
import heartOutlined from "./svgs/heartOutlined.svg";

export type CardPropsTypes = {
  name: string;
  phone: string;
  email: string;
  image: { url: string; alt: string };
  favored: boolean;
  gender: string;
  color: string;
  index?: number;
};

export const Card = ({
  email,
  phone,
  name,
  image,
  favored,
  index = 0,
}: CardPropsTypes) => {
  const { cats, setCats } = useContext(PetsContext);
  const [isFavored, setIsFavored] = useState(favored);

  const updateFavorite = (index: number, favorite: boolean) => {
    const updatedCats = [...cats];
    updatedCats[index].favored = favorite;
    setCats(updatedCats);
  };

  const toggleFavored = () => {
    updateFavorite(index, !isFavored);
    setIsFavored(!isFavored);
  };

  return (
    <>
      <article className="card">
        <div className="card-header">
          <img src={image.url} alt={image.alt} className="card-img" />
          <button className="heart" onClick={toggleFavored}>
            {isFavored ? (
              <img src={heartFilled} alt="filled heart" />
            ) : (
              <img src={heartOutlined} alt="outlined heart" />
            )}
          </button>
        </div>
        <div className="card-content">
          <h3>{name}</h3>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
      </article>
    </>
  );
};
