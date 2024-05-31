import Ternary from "src/components/ternary";
import useSettings from "src/hooks/useSettings";
import Horizontal from "./components/horizontal";
import Vertical from "./components/vertical";

const Layout = () => {
  const config = JSON.parse(localStorage.getItem("menu") || "[]");

  const { themeLayout } = useSettings();
  const verticalLayout = themeLayout === "vertical";

  return (
    <Ternary
      when={verticalLayout}
      then={<Vertical navConfig={config} />}
      otherwise={<Horizontal navConfig={config} />}
    />
  );
};
export default Layout;
