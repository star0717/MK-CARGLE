import { NextPage } from "next";

const err500: NextPage = () => {
  return <h1>500 - Server-side error occurred</h1>;
};

export default err500;
