import React, { useEffect, useState } from "react";
import { RouteProps } from "react-router";
import axios from "../../axios";
import StartPage from "./Start";
import PollsPage from "./Polls";
import Spinner from "../../components/Spinner";

const Home = (props: RouteProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<"not-started" | "running" | "finished">(
    "not-started"
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get("/polls/status")
      .then((res) => {
        setStatus(res.data.status);
        setLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Spinner spinning={true} />
        </div>
      </div>
    );

  if (status === "running" || status === "finished")
    return <PollsPage {...{ status, setStatus }} />;

  return <StartPage {...{ setStatus }} />;
};

export default Home;
