import styled from "styled-components";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import ForgotPassword from "../components/ForgotPassword";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
const signupPage = props => (
  <Columns>
    <Signup />
    <Signin />
    <ForgotPassword />
  </Columns>
);

export default signupPage;
