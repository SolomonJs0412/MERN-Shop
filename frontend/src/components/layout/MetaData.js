import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - Shop MERN `}</title>
    </Helmet>
  );
};

export default MetaData;
