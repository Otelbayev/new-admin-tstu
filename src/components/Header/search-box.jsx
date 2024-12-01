import React, { useEffect, useRef } from "react";
import { SearchBox } from "./style";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchComponent = ({ inputRef }) => {
  const { t, i18n } = useTranslation();
  const { value, setValue, isOpen } = useSearchContext();
  const navigate = useNavigate();
  const path = window.location.pathname.split("/")[2];

  const handleInputChange = (e) => {
    if (path !== "search") {
      navigate(`/${i18n.language}/search`);
    }

    if (e.target.value === "") {
      navigate(-1);
    }
    setValue(e.target.value);

    if (e.target.value === "") {
      setValue("");
    }
  };

  useEffect(() => {
    if (inputRef?.current && path === "search") {
      inputRef?.current?.focus();
    }
  }, []);

  return (
    <SearchBox $isopen={isOpen.toString()}>
      <div className="root-container">
        <div className="root-wrapper">
          <input
            type="text"
            placeholder={`${t("header.qidiruv")}...`}
            onChange={handleInputChange}
            value={value}
            ref={inputRef}
          />
        </div>
      </div>
    </SearchBox>
  );
};

export default SearchComponent;
