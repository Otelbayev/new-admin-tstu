import BlogsContextProvider from "./BlogsContext";
import FacultiesContextProvider from "./FacultiesContext";
import KafedraProvider from "./KafedraContext";
import LanguageContexProvider from "./LanguageContext";
import MenuProvider from "./MenuContext";
import SchuldeProvider from "./SchuldeContext";
import SearchContextProvider from "./SearchContext";
import TeachersProvider from "./TeachersContext";

const Context = ({ children }) => {
  return (
    <LanguageContexProvider>
      <SearchContextProvider>
        <MenuProvider>
          <FacultiesContextProvider>
            <KafedraProvider>
              <BlogsContextProvider>
                <TeachersProvider>
                  <SchuldeProvider>{children}</SchuldeProvider>
                </TeachersProvider>
              </BlogsContextProvider>
            </KafedraProvider>
          </FacultiesContextProvider>
        </MenuProvider>
      </SearchContextProvider>
    </LanguageContexProvider>
  );
};

export default Context;
