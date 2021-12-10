import { useFormik } from "formik";
import React, { FC } from "react";

interface IChatFormProps {
  sendMessage: (content: string) => void;
}

const ChatForm: FC<IChatFormProps> = ({ sendMessage }) => {
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (!values.message.trim()) {
        return;
      }

      sendMessage(values.message);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex", width: "100%" }}>
      <input
        style={{ display: "block", padding: "5px", width: "100%" }}
        id="message"
        name="message"
        type="message"
        placeholder="Message..."
        onChange={formik.handleChange}
        value={formik.values.message}
      />

      <button type="submit">Send</button>
    </form>
  );
};

export default ChatForm;
