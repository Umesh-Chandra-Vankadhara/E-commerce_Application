import React from "react";

function MessageBox(props) {
  const { variant } = props;
  return <div className={`alert alert-${variant || "info"}`}>{props.children}</div>;
}

export default MessageBox;
