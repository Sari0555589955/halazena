import React from "react";

const Input = ({ error, touched, label, ...resPorps }) => {
  return (
    <div class="mt-3">
      <label class="d-block">{label}</label>
      <input
        class={`mt-1 w-100 border p-2 ${
          error && touched ? "border-danger" : undefined
        }  `}
        {...resPorps}
        style={{ outline: 0, fontSize: "17px" }}
      />
      {error && touched ? (
        <p
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "red",
          }}
        >
          {error}
        </p>
      ) : undefined}
    </div>
  );
};

export default Input;
