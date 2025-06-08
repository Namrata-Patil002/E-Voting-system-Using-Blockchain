import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Spinner from "../Spinner";

const Landing = () => {
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
  return (
    <div className="landing">
      <div className="left">
        <div className="logo">
          <img src="logo.gif" alt="logo" />
        </div>

        <div className="title-large">Blockchain Based</div>
        <div className="title-large">Voting System</div>
        <div className="title-small">the future of voting</div>

        <div className="button-wrapper">
          <Link to="/login">
            <button className="button-black">Login</button>
          </Link>

          <Link to="/votingGuidelines">
            <button style={{ marginLeft: "1rem" }}>Voting Guidelines</button>
          </Link>
          {status === "finished" && (
            <Link
              to={{
                pathname: "/results",
                search: `?status=${status}`,
              }}
            >
              <button style={{ marginLeft: "1rem" }}>Results</button>
            </Link>
          )}
        </div>
      </div>

      <div className="right">
        { <img src="vote.gif" alt="vote" style={{maxHeight:"100%",maxWidth:"100%"}}/> }
      </div>
    </div>
  );
};

export default Landing;
