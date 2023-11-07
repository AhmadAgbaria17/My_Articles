import React from 'react';
import "./header.css"
import { useAuthUser } from "react-auth-kit";


const Header = (props) => {
  const auth = useAuthUser();

  return (
    <header>
            <h2>Wellcome {auth().username} </h2>
    </header>
  );
}

export default Header;
