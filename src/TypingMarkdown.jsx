import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function TypingMarkdown({ text }) {
    const [out, setOut] = useState("");

    useEffect(() => {
        let i = 0;
        setOut("");

        const timer = setInterval(() => {
            setOut(prev => prev + text[i]);
            i++;
            if (i === text.length) clearInterval(timer);
        }, 20);

        return () => clearInterval(timer);
    }, [text]);

    return (
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {out}
        </ReactMarkdown>
    );
}

export default TypingMarkdown;
