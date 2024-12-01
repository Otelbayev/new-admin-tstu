import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const supportedLanguages = ["uz", "en", "ru"]; // Define supported languages
const defaultLanguage = "uz"; // Set default language

const LanguageRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split("/").filter(Boolean);

    // Check if the first segment is a language code
    const hasLanguagePrefix = supportedLanguages.includes(pathSegments[0]);

    // Only redirect if no language is present in the URL
    if (!hasLanguagePrefix && pathSegments.length > 0) {
      const newPath = `/${defaultLanguage}${currentPath}`;
      if (newPath !== currentPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [location.pathname, navigate]); // Only trigger effect when `location.pathname` changes

  return null; // No UI needed for this component
};

export default LanguageRedirectHandler;
