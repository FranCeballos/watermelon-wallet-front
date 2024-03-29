import { useEffect } from "react";
import ActivityContainer from "../components/Activity/ActivityContainer";
import BalanceContainer from "../components/Balance/BalanceContainer";
import DolarContainer from "../components/Dolar/DolarContainer";
import HeaderUI from "../components/Layout/HeaderUI";
import MovementsContainer from "../components/Movements/MovementsContainer";
import { getAuthToken, getTokenDuration } from "../util/auth";
import classes from "./AppPage.module.css";
import { useSubmit } from "react-router-dom";
import { useGetBalanceAndMovementsQuery } from "../services/walletService";
import FooterApp from "../components/Footer/FooterApp";

const AppPage = () => {
  const { refetch } = useGetBalanceAndMovementsQuery();
  const submit = useSubmit();
  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    refetch();

    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit, refetch]);

  return (
    <>
      <HeaderUI />
      <main className={classes.container}>
        <DolarContainer />
        <BalanceContainer />
        <MovementsContainer />
        <ActivityContainer />
      </main>
      <FooterApp />
    </>
  );
};

export default AppPage;
