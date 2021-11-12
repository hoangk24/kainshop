import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { userApi } from "../../../api/userApi";
import Loading from "../../Loading/Loading";
import background from "../../../assets/img/background_login.jpg";

function Activemail(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  useEffect(() => {
    const activeMailRequest = async () => {
      await userApi
        .activeEmail(query.get("accessToken"))
        .then((res) => {
          setIsError(false);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsError(true);
          setIsLoading(false);
        });
    };
    activeMailRequest();
  }, []);

  return (
    <>
      <div
        className={"activeMail"}
        style={{ backgroundImage: `url(${background})` }}
      >
        {!isError ? (
          <>
            <h1>Chúc mừng</h1>
            <p>
              Bạn đã xác thực thành công email <br />
              Hãy đăng nhập để trải nghiệm dịch vụ của chúng tôi cám ơn bạn rất
              nhiều
            </p>
          </>
        ) : (
          <>
            <h1>Thông báo</h1>
            <p>
              Xác thực không thành công
              <br />
              Hãy đăng ký lại để nhận lại mã xác thực mới
            </p>
            <Link to={"/register"}>Đăng ký lại</Link>
          </>
        )}
        {isLoading ? <Loading /> : null}
      </div>
    </>
  );
}

export default Activemail;
