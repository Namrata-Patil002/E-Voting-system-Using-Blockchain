import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Chart from "../components/Polls/Chart";
import axios from "../axios";
import Spinner from "../components/Spinner";
import Back from "../components/Back";

type ElectionStatus = "running" | "finished";
const Results = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", description: "", votes: {} });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status: ElectionStatus = searchParams.get("status") as ElectionStatus;
  useEffect(() => {
    axios.get("/polls/").then((res) => {
      setData(res.data);
      setLoading(false);
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
    <div className="results-container">
      <Back call={() => navigate("/")} />
      <h1 className="results-title">Results</h1>
      <Chart votes={data.votes} voteState={status} />
    </div>
  );
};

export default Results;
