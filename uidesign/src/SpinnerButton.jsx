// src/components/UI.js
import React, { useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export function SpinnerButton({ loading, children, ...props }) {
  return (
    <button {...props} className="spinner-btn" disabled={loading || props.disabled}>
      {loading && <AiOutlineLoading3Quarters className="spinner-icon" />}
      {children}
    </button>
  );
}
