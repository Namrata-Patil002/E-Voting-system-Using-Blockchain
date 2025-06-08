import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Chart from "../../components/Polls/Chart";
import Panel from "../../components/Polls/Panel";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/toast.config";
import getHighestVotes from "../../utils/getHighestVotes";

const Polls = ({
  status,
  setStatus,
}: {
  status: "running" | "finished";
  setStatus: (status: "running" | "finished" | "not-started") => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "", votes: {} });
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    axios.get("/polls/").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const endElection = () => {
    axios
      .post("/polls/end")
      .then((_) => {
        setShowConfetti(true);
        setStatus("finished");
        toast(
          "Congratulations " +
            getHighestVotes(data).join(", ") +
            " for winning the election.",
          {
            ...toastConfig,
            position: "top-center",
            autoClose: 2800,
          }
        );
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  const resetElection = () => {
    axios
      .post("/polls/reset")
      .then((_) => {
        setStatus("not-started");
        toast.info("Election has been reset.", toastConfig);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  if (loading)
    return (
      <div className="loading-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Spinner spinning={true} />
        </div>
      </div>
    );

  return (
    <>
      <Panel name={data.name} description={data.description}>
        <>
          <Chart votes={data.votes} voteState={status} />

          {status === "running" ? (
            <Button handleClick={endElection} buttonText="End Election" />
          ) : (
            <Button handleClick={resetElection} buttonText="Reset Election" />
          )}
        </>
      </Panel>
      {showConfetti && (
        <Confetti
          numberOfPieces={600}
          recycle={false}
          run
          gravity={0.4}
          initialVelocityY={10}
          onConfettiComplete={() => {
            setShowConfetti(false);
          }}
        />
      )}
    </>
  );
};

export default Polls;
