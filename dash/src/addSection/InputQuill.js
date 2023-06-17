import React from "react";
import ReactQuill from "react-quill";

const InputQuill = ({
  label,
  field,
  setFieldValue,
  handleBlur,
  value,
  error,
  touched,
}) => {
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  return (
    <div>
      <label class="d-block mt-2 mb-1">{label}</label>
      <ReactQuill
        theme="snow"
        formats={formats}
        modules={modules}
        name={field}
        style={{
          direction: "ltr",
        }}
        value={value}
        onBlur={handleBlur}
        onChange={(e) => setFieldValue(field, e)}
      />
      {error && touched && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default InputQuill;
