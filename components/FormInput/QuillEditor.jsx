import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ label, className = "", value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      // [
      //   {
      //     size: ["small", false, "large", "huge"],
      //   },
      // ],
      ["link", "image"],
      [
        {
          color: [
            "#052971",
            "#00A0AC",
            "#000",
            "#212121",
            "#78b7dc",
            "#0086d4",
            "#0671b4",
            "#FEA700",
            "#3BD23D",
            "#38a169",
            "#00A0AC",
            "#E10A27",
            "#be4894",
          ],
        },
        { background: [] },
      ],
      [{ "code-block": true }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];
  return (
    <div className={className}>
      <label
        htmlFor="content"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default QuillEditor;
