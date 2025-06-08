import React from "react";

interface PanelProps {
  name: string;
  description: string;
  children: JSX.Element;
}

const Panel = (props: PanelProps) => {
  return (
    <div className="polls-container">
      <span className="title-small">{props.name}</span>
      <span className="text-normal">{props.description}</span>

      <div className="votes-wrapper">{props.children}</div>
    </div>
  );
};

export default Panel;
