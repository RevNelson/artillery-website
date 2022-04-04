import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const name = "Gera";
const phone = "111-111-1111";
const email = "michael@gmail.com";
const image = {
  url: "https://media.istockphoto.com/photos/scottish-fold-shorthair-cat-resting-on-chair-picture-id468382096?b=1&k=20&m=468382096&s=170667a&w=0&h=By7iGbV7dVscBWiMCsZt_zuIX6nOfqmDqhKq8oR2Rq8=",
  alt: "cute cat",
};

const cardProps = {
  name,
  phone,
  email,
  image,
  favored: false,
};

describe("Card", () => {
  describe("Basic Elements", () => {
    beforeEach(() => {
      render(<Card {...cardProps} />);
    });

    it("Should show name of cat.", () => {
      expect(
        screen.getByRole("heading", {
          name,
        })
      ).toBeInTheDocument();
    });

    it("Should show phone number.", () => {
      expect(screen.getByText(phone)).toBeInTheDocument();
    });

    it("Should show email.", () => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });

    it("Should show image with correct source.", () => {
      expect((screen.getByAltText(image.alt) as HTMLImageElement).src).toBe(
        image.url
      );
    });
  });

  it("Should show outlined heart.", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });

  it("Should show filled heart.", () => {
    render(<Card {...cardProps} favored={true} />);

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  it("Should toggle heart status.", async () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });
});

//
// COMPONENT
//

import { useState } from "react";
import "./styles/Card.css";
import heartFilled from "./svgs/heartFilled.svg";
import heartOutlined from "./svgs/heartOutlined.svg";

type CardPropsTypes = {
  name: string;
  phone: string;
  email: string;
  image: { url: string; alt: string };
  favored: boolean;
};

const Card = ({ email, phone, name, image, favored }: CardPropsTypes) => {
  const [isFavored, setIsFavored] = useState(favored);

  const toggleFavored = () => {
    setIsFavored(!isFavored);
  };

  return (
    <>
      <div className="card">
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
      </div>
    </>
  );
};
