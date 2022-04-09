import { styled } from "twin.macro";
import useLocale from "@lib/hooks/useLocale";

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
  flag: string;
};

const cdn = process.env.NEXT_PUBLIC_CDN_BASE_URL;

const FlagStyle = styled.div<FlagStylePropsType>`
  background-size: "contain";
  background-position: "50%";
  background-repeat: "no-repeat";
  background-image: ${({ square = true, flag }) => {
    return (
      "url(" + cdn + "/flags/" + (square ? "1x1" : "4x3") + "/" + flag + ".svg)"
    );
  }};
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
  const { langs } = useLocale();
  const flag = langs[locale].flag;
  return (
    <FlagStyle
      locale={locale}
      square={square}
      flag={flag}
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
