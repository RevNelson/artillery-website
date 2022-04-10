import { ThemeProvider } from "@emotion/react";
import { FC, ReactNode } from "react";

import GlobalStyles from "@styles/emotion-global";
import { emotionTheme } from "@styles/emotion-theme";
import ScrollArrow from "@components/ui/ScrollArrow";

// ####
// #### Types
// ####

interface PropsType {
  children: ReactNode | ReactNode[];
}

// ####
// #### Component
// ####

const Layout: FC<PropsType> = ({ children }) => {
  return (
    <ThemeProvider theme={emotionTheme}>
      <GlobalStyles />
      <ScrollArrow />
      {/* <Header promo /> */}
      <main className="overflow-y-auto bg-white max-w-full relative overflow-x-hidden font-family min-h-screen">
        {children}
      </main>
      {/* <Footer />
    <Alerts /> */}
    </ThemeProvider>
  );
};

export default Layout;
