import React from "react";
import Popup from "reactjs-popup";
import "./popUp.css";
const popUp = ({ title, content, action, iconClass }) => {
  return (
    <Popup
      trigger={
        <button className="button">
          <i className={`fas ${iconClass}`} />
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> {title}</div>
          <div className="content"> {content}</div>
          <div className="actions">
            <button
              className="btn btn-default btn-warning"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              CANCEL
            </button>
            <button
              className="btn btn-default btn-primary"
              onClick={() => {
                action();
                close();
              }}
            >
              CONFIRM
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default popUp;
