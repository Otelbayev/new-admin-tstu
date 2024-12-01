import { createContext, useContext, useState } from "react";

const KafedraContext = createContext();

export const useKafedraContext = () => useContext(KafedraContext);

const KafedraProvider = ({ children }) => {
  const [kafedras, setKafedras] = useState({ list: [] });
  return (
    <KafedraContext.Provider value={{ kafedras, setKafedras }}>
      {children}
    </KafedraContext.Provider>
  );
};

export default KafedraProvider;
