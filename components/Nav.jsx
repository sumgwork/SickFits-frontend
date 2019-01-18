import Link from "next/link";
import React from "react";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";

const Nav = props => {
  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          {me && <p>Welcome {me.name}!&nbsp;</p>}
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {!me && (
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          )}
          {me && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>

              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <Signout />
            </>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
