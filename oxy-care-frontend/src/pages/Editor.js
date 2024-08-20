import { useCallback, useMemo, useRef, useState,useEffect } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./styles-module.css";
import axios from 'axios';

const Editor = ({ initialValue, type }) => {
  // Editor state
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initialValue)
}, [initialValue]);



  const quill = useRef();




  const handleSubmit = async () => {
    try {
      if (type === 1) {
                await axios.post('http://localhost:8080/editor/submit/1', { content:value });
            } else if (type === 2) {
                await axios.post('http://localhost:8080/editor/submit/2', { content:value });
            }
      alert('Content updated successfully');
      window.location.reload();

    } catch (error) {
      console.error('Error updating content:', error);
      alert('Error updating content');
    }
  };

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

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
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <div className = "wrapper" >
      <label className = "label" >Editor Content</label>
      <QuillEditor
        ref={(el) => (quill.current = el)}
        className= "editor"
        theme="snow"
        defaultValue={initialValue}
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      />
      <button onClick={handleSubmit} className = "btn" >
        Submit
      </button>
    </div>
  );
};

export default Editor;