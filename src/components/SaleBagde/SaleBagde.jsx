import React from "react";
import sale from "../../assets/img/discount.png";
export default function SaleBagde({ discount }) {
  return (
    <div className='sale-bagde'>
      <img src={sale} alt='' />
      <h5>{discount}%</h5>
    </div>
  );
}
