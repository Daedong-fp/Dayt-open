import { GlobalStyle } from "../components/GlobalStyle";
import { Header } from "../components/Header";
import { CTA } from "../components/CTA";
import { Features } from "../components/Features";
import { Kanban } from "../components/Kanban";

export const HomePage = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <CTA />
      <Features />
      <Kanban />
    </>
  );
};
