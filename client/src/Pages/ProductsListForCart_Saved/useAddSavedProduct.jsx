import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToSavedProductMutation } from "../../APIs/SavedProductApi";
import { incrementSaved, descrementSaved } from "../../APIs/savedSlice";
import useGetUserInfo from "./../Profile/useGetUserInfo";

function useAddToSavedProduct() {
  const navigate = useNavigate();

  const [addToSavedProduct] = useAddToSavedProductMutation();
  const dispatch = useDispatch();
  const [_, { language: lang }] = useTranslation();
  const { userinfo } = useGetUserInfo();

  function addSavedProduct(saved) {
    if (saved?.product && userinfo && userinfo?.user?.email != "") {
      if (sessionStorage.getItem("token")) {
        addToSavedProduct(saved).then(({ data, error }) => {
          if (data) {
            toast.success(data[`success_${lang}`]);
            if (data.action == "added") dispatch(incrementSaved());
            else dispatch(descrementSaved());
          }
        });
      }
    } else {
      toast.error(
        lang == "en"
          ? "You Cant Add to savedProducts utill you login"
          : "لا يمكن إضافة إلى القائمة المحفوظة حتى تقوم بتسجيل الدخول"
      );
      navigate("/sign-in");
    }
  }
  return [addSavedProduct];
}

export default useAddToSavedProduct;
