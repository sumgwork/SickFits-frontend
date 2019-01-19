import UpdatePassword from "../components/UpdatePassword";

const resetPassword = props => (
  <UpdatePassword resetToken={props.query.token} />
);

export default resetPassword;
