import React from 'react';

export function Loader() {
  return (
    <div className="loader" style={center}>
      <i className="fa fa-cog fa-spin" />
    </div>
  );
}

const center = {
    margin: 'auto',
    width: '50%',
    maxWidth: '100px',
    minWidth: '100px',
    position: 'relative',
    marginTop: '200px',
    marginBottom: '300px',
    marginLeft: '600px',
    fontSize: '30px'
  }