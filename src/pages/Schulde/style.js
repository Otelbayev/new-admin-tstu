import styled from "styled-components";
import { Form as F } from "antd";

export const Form = styled(F)`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  .form-item {
    width: 100%;
    .full {
      width: 100%;
    }
    button {
      width: 100%;
      height: 35px;
      border-radius: 5px;
    }
  }
  label {
    display: block;
  }
  select {
    width: 100%;
  }
`;
