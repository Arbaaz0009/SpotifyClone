import React from "react";
import { useSelector } from "react-redux";


const Test = () => {
  const data = useSelector((state) => state.songsData);
  
  console.log(data);
  
  return <div>{data[0].name}</div>;
};

export default Test;
