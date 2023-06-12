import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToSavedProductMutation } from "../../APIs/SavedProductApi";
import { incrementSaved, descrementSaved } from "../../APIs/savedSlice";
import useGetUserInfo from "./../Profile/useGetUserInfo";

function useAddToSavedProduct() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state);

  const [addToSavedProduct] = useAddToSavedProductMutation();
  const dispatch = useDispatch();
  const [_, { language: lang }] = useTranslation();
  const { userinfo } = useGetUserInfo();
  function addSavedProduct(saved) {
    console.log("saved", saved);
    if (saved?.product && currentUser?.email) {
      if (sessionStorage.getItem("token")) {
        addToSavedProduct(saved).then(({ data }) => {
          if (data) {
            toast.success(data[`success_${lang}`]);
            if (data.action == "added") dispatch(incrementSaved());
            else dispatch(descrementSaved());
          }
        });
      }
    } else {
      setTimeout(() => {
        toast.error(
          lang == "en" ? "You should login first" : "ينبغي أن تسجل دخول أولاً"
        );
      }, 500);
      navigate("/sign-in");
    }
  }
  return [addSavedProduct];
}

export default useAddToSavedProduct;
