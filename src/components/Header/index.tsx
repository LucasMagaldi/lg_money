import React from 'react';
import logo from "../../assets/logo.svg";
import * as Component from "./styles";

export function Header() {
  return (
    <Component.Container>
        <Component.Content>
            <img src={logo} alt='alt money'/>
            <button type='button'>
                Nova transação
            </button>
        </Component.Content>
        
    </Component.Container>
  )
}

//export default index