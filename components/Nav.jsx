import Link from "next/link";
import React from "react";

const Nav = props => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
    </div>
  );
};

export default Nav;
