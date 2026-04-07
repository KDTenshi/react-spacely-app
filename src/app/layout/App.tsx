import type { FC } from "react";
import "../style/App.scss";
import { Header } from "../../features/Layout/components/Header";
import { SideMenu } from "../../features/Layout/components/SideMenu";
import Router from "../router/Router";

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="Body">
        <SideMenu />
        <Router />
      </div>
    </div>
  );
};

export default App;
