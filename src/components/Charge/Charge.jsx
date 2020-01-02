import React from 'react';

const Charge = ({ charge: { data } }) => {
  return (
    <>
      <li>{data.name}</li>
    </>
  );
};

export default Charge;
