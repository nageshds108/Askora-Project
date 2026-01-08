import "./chat.css";
import {MyContext} from "./myContext.jsx";
import { useContext,useState,useEffect } from "react";
import ReactMarkdown from "react-markdown" 
import rehypeHighlight from "rehype-highlight";
import  "highlight.js/styles/github-dark.css";




function Chat() {
    const{newChat,prevChats,shouldAnimate,setShouldAnimate}=useContext(MyContext);
    const[latestReply,setLrep]= useState(null);

    useEffect(()=>{
        if(!prevChats || prevChats.length === 0 || !shouldAnimate){
            setLrep(null);
            return;
        }

        const lastMsg = prevChats[prevChats.length - 1];
        
        if(lastMsg.role !== "assistant"){
            setLrep(null);
            return;
        }

        const content = lastMsg.content.split(" ");

        let idx = 0;
        setLrep("");
        const interval = setInterval(()=>{
            setLrep(content.slice(0,idx+1).join(" "));
            idx++;
            if (idx >= content.length) {
                clearInterval(interval);
                setShouldAnimate(false);
            }
        }, 40);

        return() => clearInterval(interval);

    }, [prevChats, shouldAnimate])
    return (
        <>
        {newChat&& <h1>Start a New Chat !</h1>}
        <div className="chats">
            {
                prevChats?.map((chat, idx) => {
                    const isLastMessage = idx === prevChats.length - 1;
                    const isAssistantLastMessage = isLastMessage && chat.role === "assistant";
                    
                    return (
                        <div className={chat.role==="user"?"userDiv":"gptDiv"} key={idx}>
                            {
                                chat.role==="user"?
                                <p className="userMessage">{chat.content}</p>:
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {isAssistantLastMessage && latestReply !== null ? latestReply : chat.content}
                                </ReactMarkdown>                   
                            }
                        </div>
                    );
                })
            }
        </div>
        </>
    )
}

export default Chat;