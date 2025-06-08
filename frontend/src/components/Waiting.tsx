import React from "react";

const Waiting = ({ title }: { title: string }) => {
  return (
    <div className="waiting-wrapper">
      <div className="cog">
        <i className="bi bi-gear-fill"></i>
      </div>

      <div className="title-small">{title}</div>
    </div>
  );
};

export default Waiting;
