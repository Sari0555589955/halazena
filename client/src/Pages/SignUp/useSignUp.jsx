import React from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../APIs/UserApis";
function useSignUp() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [_, { language: lang }] = useTranslation();
  function signUp(user) {
    if (user?.email && user?.password) {
      register(user).then(({ data, error }) => {
        if (data) {
          toast.success(data[`success_${lang}`]);
          setTimeout(() => {
            navigate("/sign-in");
          }, 1000);
        }

        if (error) {
          typeof error.data === "string"
            ? toast.error(error.data)
            : toast.error(error.data[`error_${lang}`]);
        }
      });
    } else {
      toast.error("Both User email and user password are Required");
    }
  }
  return [signUp];
}

export default useSignUp;
