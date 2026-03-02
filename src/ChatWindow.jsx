import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats } =
    useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  const getReply = async () => {
    if (!prompt) return; // prevent empty messages
    setLoading(true);
    console.log("message", prompt, "threadId", currThreadId);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const data = await response.json();
      setReply(data.reply); // update reply state
      console.log("Reply from backend:", data.reply);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // Update chat history when reply is received
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prev) => [
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }

    setPrompt(""); // clear input after sending
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          AuraGpt <i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {
        isOpen && 
        <div className="dropDown">
          <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
           <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Upgrade plan</div>
            <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Upgrade plan</div>

          </div>
      }

      <Chat>
        <ScaleLoader color="#fff" loading={loading} />

        <div className="chatInput">
          <div className="inputBox">
            <input
              placeholder="Ask Anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
            />
            <div id="submit" onClick={getReply}>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
          <p className="info">
            AuraGpt can make mistakes. Check important info. See cookie preferences.
          </p>
        </div>
      </Chat>
    </div>
  );
}

export default ChatWindow;
