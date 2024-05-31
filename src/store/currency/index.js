import { createContext, useContext, useState } from "react";

const currencyContext = createContext({
  code: "USD",
  list: [],
});

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const selected = localStorage.getItem("currency");
    if (selected) {
      return {
        code: selected,
        list: [],
      };
    }
    return {
      code: "USD",
      list: [],
    };
  });

  return (
    <currencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </currencyContext.Provider>
  );
};

export const useCurrency = () => useContext(currencyContext);

export default CurrencyProvider;
