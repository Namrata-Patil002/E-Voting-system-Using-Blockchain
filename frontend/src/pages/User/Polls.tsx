import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import Chart from "../../components/Polls/Chart";
import Finished from "../../components/Polls/Finished";
import Panel from "../../components/Polls/Panel";
import Running from "../../components/Polls/Running";
import Waiting from "../../components/Waiting";
import { AuthContext } from "../../contexts/Auth";
import Spinner from "../../components/Spinner";

const User = () => {
  const [voteState, setVoteStatus] = useState<
    "finished" | "running" | "not-started" | "checking"
  >("checking");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "", votes: {} });
  const [votable, setVotable] = useState("");

  const authContext = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/polls/status")
      .then((res) => {
        setVoteStatus(res.data.status);
        setLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    if (voteState !== "checking") {
      axios.get("/polls/").then((res) => {
        setData(res.data);
        setLoading(false);
      });

      axios
        .post("/polls/check-voteability", {
          id: authContext.id.toString(),
        })
        .then((res) => {
          setVotable(res.data);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [voteState, authContext.id]);

  if (loading || voteState === "checking")
    return (
      <div className="loading-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Spinner spinning={true} />
        </div>
      </div>
    );

  if (voteState === "not-started")
    return <Waiting title="WAITING FOR THE ELECTION TO START" />;

  return (
    <Panel name={data.name} description={data.description}>
      <>
        {voteState === "running" ? <Running /> : <Finished />}

        {votable === "not-voted" || voteState === "finished" ? (
          <Chart
            enableVote={votable === "not-voted"}
            userId={authContext.id}
            userName={authContext.name}
            votes={data.votes}
            voteState={voteState}
            setVotable={setVotable}
          />
        ) : null}
        {votable === "voted" || votable === "already-voted" ? (
          <Waiting title="RESULTS NOT YET DECLARED" />
        ) : null}
      </>
    </Panel>
  );
};

export default User;
