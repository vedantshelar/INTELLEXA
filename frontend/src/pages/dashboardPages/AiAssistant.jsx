import React, { useState, useRef, useEffect } from "react";
import styles from "./AiAssistant.module.css";
import { useSelector, useDispatch } from 'react-redux'
import UploadSection from "./UploadSection";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const AiAssistant = () => {

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hi 👋 I’m Intellexa AI Assistant. Ask me anything about your business data.",
    },
  ]);

  const [input, setInput] = useState("");

  let currentDatasetIndex = useSelector((state) => {
    return state.datasetIndex.index;
  })

  let businessDataId = useSelector((state) => {
    if (state.data.data.data.length != 0) {
    return state.data.data.data[currentDatasetIndex]._id;
    }else{
      return undefined;
    }
  })

  let summary = useSelector((state) => {
    if (state.data.data.data.length != 0) {
      return state.data.data.data[currentDatasetIndex].LLMResult.summary;
    } else {
      return undefined;
    }
  })

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if(businessDataId){
      getChats(businessDataId);
    }
  }, []);


  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: input },
    ]);

    let data = {
      question: input,
      summary: summary,
      businessDataId: businessDataId
    }

    const response = await axios.post(
      `${backend_url}/aiAssitant`, data,
      { withCredentials: true }
    )

    if (response.data.success) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: response.data.data.answer,
        },
      ]);
    }

    setInput("");
  };

  async function getChats(businessDataId) {
    const response = await axios.get(
      `${backend_url}/chats/${businessDataId}`,
      { withCredentials: true }
    )
    let messagesObjectArray = response.data.data;
    for (let messagesObject of messagesObjectArray) {
      setMessages((prev) => [
        ...prev,
        {
          type: messagesObject.role,
          text: messagesObject.message,
        },
      ]);
    }
  }

  if (summary) {
    return (
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Intellexa AI Assistant</h2>
          <p>Ask questions about your business data</p>
        </div>

        {/* Chat Messages */}
        <div className={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${msg.type === "user" ? styles.user : styles.ai
                }`}
            >
              {msg.text}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Ask anything about your business data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    );
  } else {
    return <UploadSection />
  }

};

export default AiAssistant;
