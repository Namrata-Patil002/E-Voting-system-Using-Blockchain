import React from "react";
import Back from "../components/Back";
import { useNavigate } from "react-router";

const ElectionGuidelines = () => {
  const navigate = useNavigate();

  return (
    <div className="view-container">
      <Back call={() => navigate("/")} />
      <div>
        <h3>Election Guidelines</h3>
        <ol>
          <li>
            <strong>Voter Registration:</strong> To cast your vote, you must
            first register by providing your username, email, and password.
          </li>
          <li>
            <strong>User Verification:</strong> Once you have registered, an
            administrator will verify your citizenship number. You must be
            verified in order to be eligible to vote.
          </li>
          <li>
            <strong>Voting Process:</strong> Once you have been verified, you
            can login using your credentials to cast your vote. The election
            will be carried out in three phases:
            <ol style={{ listStyleType: "lower-alpha", paddingLeft: "20px" }}>
              <li>
                <strong>Phase 1: Election Creation</strong> - During this phase,
                the election will be created and all necessary details will be
                finalized.
              </li>
              <li>
                <strong>Phase 2: Voting Phase</strong> - This is the main phase
                of the election where users can cast their votes. You will be
                able to access the voting page and vote for your preferred
                candidate.
              </li>
              <li>
                <strong>Phase 3: Result Declaration</strong> - After the voting
                phase is completed, the votes will be counted and the results
                will be declared. The winner of the election will be announced
                to all users.
              </li>
            </ol>
          </li>
        </ol>
        <p>
          Please note that the election process is designed to be fair and
          transparent. Any attempts at fraudulent behavior will be strictly
          prohibited and dealt with accordingly.
        </p>
      </div>
    </div>
  );
};

export default ElectionGuidelines;
