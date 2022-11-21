import { Outlet, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useState, useEffect, useRef } from "react";
import usePersist from "../../hooks/usePersist";
import useAuthStore from "../../app/stores/authStore";
import { refresh } from "../../app/api/authApi";

export default function PersistLogin() {
  const [persist] = usePersist();
  const [trueSuccess, setTrueSuccess] = useState(false);
  const effectRan = useRef(false);
  const token = useAuthStore((state) => state.token);
  const loginStore = useAuthStore((state) => state.login);

  const { isError, isSuccess, error, refetch } = useQuery("creds", refresh, {
    enabled: false,
    onSuccess: (data) => {
      loginStore(data?.username, data?.tier, data?.accessToken);
    },
  });

  useEffect(() => {
    // For React 18 Strict Mode
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("Verifying refresh token.");
        try {
          await refetch();
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist:no
    console.log("No persist.");
    content = <Outlet />;
  } else if (isError) {
    // persist: yes, token: no
    console.log("Error.");
    content = (
      <p>
        {error.data?.message}
        <Link to="/">Please login again.</Link>
      </p>
    );
  } else if (isSuccess & trueSuccess) {
    // persist: yes, token: yes
    console.log("Success.");
    content = <Outlet />;
  } else if (token) {
    console.log("Token exists.");
    content = <Outlet />;
  }

  return content;
}
