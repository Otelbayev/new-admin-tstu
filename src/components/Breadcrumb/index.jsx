import React from "react";
import { Container, Ul, Li, Link } from "./style";

const Breadcrumb = ({ breadcrumb, data }) => {
  return (
    <Container>
      <Ul $breadcrumb={breadcrumb}>
        <Li>
          <Link to="/">Asosiy</Link>
        </Li>
        <Li>
          <Link to={data?.path}>{data?.breadCrumbName}</Link>
        </Li>
      </Ul>
    </Container>
  );
};

export default Breadcrumb;
