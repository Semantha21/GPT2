import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import TypingMarkdown from "./TypingMarkdown"; 

function Chat({ children }) {
    const { newChat, prevChats, currentReply } = useContext(MyContext);
    

    return (
        <>
            {newChat && <h1>Create your Aura!</h1>}
            <div className="chats">
                {prevChats?.map((chat, idx) => {
                    const isTypingMessage =
                        chat.role === "assistant" && chat === currentReply;

                    return (
                        <div
                            className={chat.role === "user" ? "userDiv" : "gptDiv"}
                            key={idx}
                        >
                            {chat.role === "user" ? (
                                <p className="userMessage">{chat.content}</p>
                            ) : isTypingMessage ? (
                                
                                <TypingMarkdown text={chat.content} />
                            ) : (
                                
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {chat.content}
                                </ReactMarkdown>
                            )}
                        </div>
                    );
                })}
                {children}
            </div>
        </>
    );
}

export default Chat;
