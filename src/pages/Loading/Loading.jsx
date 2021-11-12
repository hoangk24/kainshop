import React from "react";
import loading from "../../assets/img/loading.gif";
function Loading(props) {
  return (
    <div className={"loading"}>
      <div className='spin'>
        <img src={loading} alt='' />
      </div>
    </div>
  );
}

export default Loading;
