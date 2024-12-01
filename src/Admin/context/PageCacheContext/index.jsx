import { createContext, useContext, useState } from "react";

const PageCacheContext = createContext();

export const usePageCacheContext = () => useContext(PageCacheContext);

const PageCacheProvider = ({ children }) => {
  const [pageCache, setPageCache] = useState([]);
  return (
    <PageCacheContext.Provider value={{ pageCache, setPageCache }}>
      {children}
    </PageCacheContext.Provider>
  );
};

export default PageCacheProvider;
