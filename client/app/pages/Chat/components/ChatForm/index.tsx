import React, { FC } from "react";
import { useFormik } from "formik";

export interface IMessage {
  id: number;
  message: string;
  from: string;
  createdAt: string;
}

interface IChatFormProps {
  sendMessage: (msg: IMessage) => void;
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

      const msg: IMessage = {
        id: Math.random(),
        message: values.message,
        from: "12",
        createdAt: new Date().toISOString(),
      };

      sendMessage(msg);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex" }}>
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
