import React from "react";
import axios from "../../axios";
import { toastConfig } from "../../constants/toast.config";
import { toast } from "react-toastify";

interface ChartProps {
  votes: any;
  enableVote?: boolean;
  userId?: number;
  userName?: string;
  voteState?: "finished" | "running";
  setVotable?: (votable: "voted" | "not-voted") => void;
}

const Chart = (props: ChartProps) => {
  const votes = props.votes;

  const vote = (candidate: string) => {
    axios
      .post("/polls/vote", {
        id: props.userId?.toString(),
        name: props.userName,
        candidate,
      })
      .then((_) =>
        props.setVotable
          ? (props.setVotable("voted"),
            toast.success("Your vote has been cast successfully", toastConfig))
          : null
      )
      .catch((err) => {
        throw new Error(err);
      });
  };
  const getTotal = () => {
    let total = 0;

    for (const name in votes) {
      total += parseInt(votes[name]);
    }

    return total;
  };
  const getCandidatesChartData = () => {
    const candidates = [];

    for (const name in votes) {
      const count = votes[name];
      const total = getTotal();

      candidates.push(
        <div key={name} className="name-button-wrapper">
          {props.voteState === "finished" ? (
            <div className="bars-container">
              <div className="bar-wrapper">
                <div
                  style={{
                    height: count !== 0 ? `${(count * 100) / total}%` : "auto",
                    border: "2px solid #4daaa7",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    color: "white",
                    backgroundColor: "rgb(77, 170, 167)",
                    paddingBottom: 10,
                    paddingTop: 10,
                  }}
                >
                  {votes[name]}
                </div>
              </div>
            </div>
          ) : null}
          {props.voteState === "running" ? (
            <div className="candidate-icon">
              <i className="bi bi-person-circle"></i>
            </div>
          ) : null}
          <div className="name-wrapper text-normal">{name}</div>
          {props.enableVote ? (
            <button onClick={() => vote(name)} className="text-normal">
              vote
            </button>
          ) : null}
        </div>
      );
    }

    return candidates;
  };

  return (
    <div className="user-voting-container">
      <div className="names-and-buttons-wrapper">
        {getCandidatesChartData()}
      </div>
    </div>
  );
};

export default Chart;
