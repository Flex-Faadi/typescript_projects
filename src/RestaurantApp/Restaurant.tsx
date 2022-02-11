import React, { useState } from "react";
import './style.css';
import Menu from './Data';
import MenuCard from "./MenuCard";
import Navbar from "./Nav";

const uniqueList = Array.from([new Set(Menu.map((curElem:any) => {return curElem.category})),"All"])

console.log(uniqueList);

const Resturant = () => {
  const [menuData, setMenuData] = useState(Menu);
  const [menuList, setMenuList] = useState(uniqueList);

  const filterItem = (category:any) => {
    if (category === "All") {
      setMenuData(Menu);
      return;
    }

    const updatedList = Menu.filter((curElem:any) => {
      return curElem.category === category;
    });

    setMenuData(updatedList);
  };

  return (
    <>
      <Navbar filterItem={filterItem} menuList={menuList} />
      <MenuCard menuData={menuData} />
    </>
  );
};

export default Resturant;