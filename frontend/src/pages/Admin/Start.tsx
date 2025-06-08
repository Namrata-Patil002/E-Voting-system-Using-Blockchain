import React, { useRef, useState } from "react";
import { Formik } from "formik";
import axios from "../../axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { toastConfig } from "../../constants/toast.config";

const schema = yup.object({
  name: yup.string().min(3).required(),
  description: yup.string().min(10).required(),
});

interface Candidate {
  name: string;
  info: string;
}

const Start = ({
  setStatus,
}: {
  setStatus: (status: "running" | "finished" | "not-started") => void;
}) => {
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const candidateField = useRef<HTMLInputElement>(null);
  const candidateInfoField = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div>
        <h1 className="title-small" style={{ textAlign: "center" }}>
          Create an Election
        </h1>
        <div className="form-container">
          {error !== "" ? (
            <div className="error-message">
              {error.charAt(0).toUpperCase() + error.slice(1)}
            </div>
          ) : null}

          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            validationSchema={schema}
            onSubmit={({ name, description }) => {
              let candidatesError = "";

              if (candidates.length < 2)
                candidatesError = "Not Enough Candidates";
              setError(candidatesError);

              if (candidatesError === "") {
                axios
                  .post("/polls/start", { name, description, candidates })
                  .then((_) => {
                    toast.info("Election started.", toastConfig);
                    setStatus("running");
                  })
                  .catch((err) => {
                    throw new Error(err);
                  });
              }
            }}
          >
            {({ errors, touched, getFieldProps, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    id="name"
                    type="text"
                    placeholder="Poll Name"
                    {...getFieldProps("name")}
                  />

                  <div className="form-error-text">
                    {touched.name && errors.name
                      ? errors.name.charAt(0).toUpperCase() +
                        errors.name.slice(1)
                      : null}
                  </div>
                </div>

                <div className="input-container">
                  <input
                    id="description"
                    type="text"
                    placeholder="Poll Description"
                    {...getFieldProps("description")}
                  />

                  <div className="form-error-text">
                    {touched.description && errors.description
                      ? errors.description.charAt(0).toUpperCase() +
                        errors.description.slice(1)
                      : null}
                  </div>
                </div>

                {candidates.length !== 0 ? (
                  <div className="candidates-container">
                    {candidates.map(({ name, info }, index) => (
                      <div key={index} className="candidate-wrapper">
                        <span>{name}</span>
                        <span
                          onClick={() => {
                            const newList = [...candidates];
                            const i = newList.findIndex(
                              (candidate) =>
                                candidate.name === name &&
                                candidate.info === info
                            );
                            newList.splice(i, 1);

                            setCandidates(newList);
                          }}
                          className="remove"
                        >
                          <i className="bi bi-dash-circle"></i>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="input-container">
                  <div className="add-candidate-wrapper">
                    <input
                      type="text"
                      placeholder="Add Candidate"
                      ref={candidateField}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />

                    <button
                      className=""
                      type="button"
                      disabled={
                        candidateField.current?.value === "" ||
                        candidateInfoField.current?.value === "" ||
                        info.length < 10
                      }
                      onClick={() => {
                        const newCandidate = {
                          name: candidateField.current!.value,
                          info: candidateInfoField.current!.value,
                        };
                        setName("");
                        setInfo("");
                        setCandidates([...candidates, newCandidate]);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="input-container">
                  <div className="add-candidate-wrapper">
                    <input
                      type="text"
                      placeholder="Candidate Info"
                      value={info}
                      ref={candidateInfoField}
                      onChange={(e) => {
                        setInfo(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <button className="login-button button-primary" type="submit">
                  Start Election
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Start;
