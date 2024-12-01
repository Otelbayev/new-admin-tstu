import React from "react";
import BlogProvider from "./BlogContext";
import DepartmentProvider from "./DepartmentContext";
import MenuProvider from "./MenuContext";
import PageProvider from "./PageContext";
import StatusProvider from "./Status";
import LocationProvider from "./LocationContext";
import GenderProvider from "./GenderContext";
import PersonContextProvider from "./PersonContext";
import SiteContextProvider from "./SiteContext";
import UserContextProvider from "./UserContext";
import EmployeeContextProvider from "./EmployeeContext";
import DateContextProvider from "./DateContext";
const AdminContext = ({ children }) => {
  return (
    <BlogProvider>
      <DepartmentProvider>
        <MenuProvider>
          <PageProvider>
            <StatusProvider>
              <LocationProvider>
                <GenderProvider>
                  <PersonContextProvider>
                    <SiteContextProvider>
                      <UserContextProvider>
                        <EmployeeContextProvider>
                          <DateContextProvider>{children}</DateContextProvider>
                        </EmployeeContextProvider>
                      </UserContextProvider>
                    </SiteContextProvider>
                  </PersonContextProvider>
                </GenderProvider>
              </LocationProvider>
            </StatusProvider>
          </PageProvider>
        </MenuProvider>
      </DepartmentProvider>
    </BlogProvider>
  );
};

export default AdminContext;
