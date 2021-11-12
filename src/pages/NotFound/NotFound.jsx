import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='notfound'>
      <div className='notfound__content'>
        <h1>404</h1>
        <p>Opp! Something went wrong...</p>
        <Link to='/'>Back to home</Link>
      </div>
    </div>
  );
}
