import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREMENT,
  DECREMENTBYVALUE,
  INCREMENT,
  INCREMENTBYVALUE,
} from "../store/features/Count/CountSlice";

const Count = () => {
  const count = useSelector((state: any) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="count-container">
      <h3>{count.count}</h3>
      <div className="action-container">
        <button
          className="primary-button"
          onClick={() => dispatch(INCREMENT())}
        >
          Increment
        </button>
        <button
          className="primary-button"
          onClick={() => dispatch(DECREMENT())}
        >
          Decrement
        </button>
        <button
          className="primary-button"
          onClick={() => dispatch(INCREMENTBYVALUE(5))}
        >
          Increment by 5
        </button>
        <button
          className="primary-button"
          onClick={() => dispatch(DECREMENTBYVALUE(2))}
        >
          Decrement by 2
        </button>
      </div>
    </div>
  );
};

export default Count;
