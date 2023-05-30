import { useLazyCreateGuestUserQuery } from "./gestUserApi";

export default function useGuestUserToken() {
  const [getGuestUser] = useLazyCreateGuestUserQuery();
  const calledGetGuestUser = (state) => {
    if(state){

      getGuestUser().then(({ data }) => {
        if (data.token) {
          sessionStorage.setItem("token", data.token);
        }
      });
    }
  };
  return calledGetGuestUser;
}
