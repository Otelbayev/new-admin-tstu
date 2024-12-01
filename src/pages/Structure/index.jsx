import React, { useEffect, useState } from "react";
import { Container } from "./styler";
import logo from "../../../public/logo/logo2.png";
import { useTranslation } from "react-i18next";
import { createTree } from "./create-tree";
import TreeNode from "./tree-node";
import { Helmet } from "react-helmet";

const Structure = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/structuredepartament`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/structuredepartamenttranslation?language_code=${
            i18n.language
          }`
    )
      .then((res) => res.json())
      .then((res) => setData(res.filter((e) => !Number(e.title))));
  }, [i18n.language]);

  const treeData = createTree(data);

  return (
    <div>
      <Helmet>
        <title>{t("structure")}</title>
      </Helmet>
      <Container className="root-container">
        <div className="root-wrapper">
          <div className="structure-top">
            <img loading="lazy" src={logo} className="structure-top__logo" />
            <div className="structure-top__title">{t("structure")}</div>
          </div>
          <div className="mt-3">
            {treeData.map((node) => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Structure;
