import React from 'react';

const ChargeList = props => {
  const listId = props.location.pathname.split('/')[2];

  return (
    <div>
      <h1>ChargeList </h1>

      <div>id: {listId}</div>
    </div>
  );
};

export default ChargeList;
