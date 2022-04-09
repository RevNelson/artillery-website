import { styled } from "twin.macro";
import { i18n } from "@lib/i18n/config";

type PropsType = {
  size?: number;
  rounded?: boolean | string;
  square?: boolean;
  locale: string;
};

type FlagStylePropsType = {
  locale: string;
  square?: boolean;
  size?: number;
};

const cdn = process.env.NEXT_PUBLIC_CDN_BASE_URL;

const FlagStyle = styled.div<FlagStylePropsType>`
  background-size: "contain";
  background-position: "50%";
  background-repeat: "no-repeat";
  background-image: ${({ locale, square = true }) =>
    "url(" +
    cdn +
    "/flags/" +
    (square ? "1x1" : "4x3") +
    "/" +
    i18n.langs.filter((lang) => lang.code === locale)[0].flag +
    ".svg)"};
  width: ${({ size = 8 }) => `${size}rem`};
  height: ${({ size = 8, square }) =>
    square ? `${size}rem` : `${size * 0.75}rem`};
`;

const FlagIcon = ({
  size = 16,
  rounded = "rounded",
  square = false,
  locale,
}: PropsType) => {
  return (
    <FlagStyle
      locale={locale}
      square={square}
      size={size / 4}
      className={`${
        rounded
          ? typeof rounded === "string"
            ? rounded
            : "rounded" + " overflow-hidden"
          : ""
      } `}
    />
  );
};

export default FlagIcon;
