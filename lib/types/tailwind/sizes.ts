type SizeType = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

type TopSizeType =
  | "t-none"
  | "t-sm"
  | "t"
  | "t-md"
  | "t-lg"
  | "t-xl"
  | "t-2xl"
  | "t-3xl"
  | "t-full";

type RightSizeType =
  | "r-none"
  | "r-sm"
  | "r"
  | "r-md"
  | "r-lg"
  | "r-xl"
  | "r-2xl"
  | "r-3xl"
  | "r-full";

type BottomSizeType =
  | "b-none"
  | "b-sm"
  | "b"
  | "b-md"
  | "b-lg"
  | "b-xl"
  | "b-2xl"
  | "b-3xl"
  | "b-full";

type LeftSizeType =
  | "l-none"
  | "l-sm"
  | "l"
  | "l-md"
  | "l-lg"
  | "l-xl"
  | "l-2xl"
  | "l-3xl"
  | "l-full";

export type SizesType =
  | SizeType
  | TopSizeType
  | RightSizeType
  | BottomSizeType
  | LeftSizeType;
