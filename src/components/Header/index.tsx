import React, { useState } from 'react';
import logo from "../../assets/logo.svg";
import * as Component from "./styles";

interface HeaderProps {
    openModal: () => void;
}

export function Header({ openModal }: HeaderProps) {

  return (
    <Component.Container>
        <Component.Content>
            <img src={logo} alt='alt money'/>
            <button type='button'  onClick={openModal}>
                Nova transação
            </button>
        </Component.Content>
        
    </Component.Container>
  )
}

//export default index