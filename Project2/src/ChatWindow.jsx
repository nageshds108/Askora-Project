import "./ChatWindow.css";
import Chat from "./chat";
import {MyContext} from "./myContext.jsx";
import { useContext,useState,useEffect } from "react";
import { CircleLoader } from 'react-spinners';



function ChatWindow () {
  const{prompt,setPrompt,reply,setReply,currTID,setChat,prevChats,setTID,setNchat,shouldAnimate,setShouldAnimate}=useContext(MyContext)
  let[loading, setLoading]=useState(false);
  const[isOpen, setIsOpen]= useState(false);


  const getRES = async ()=>{
    setLoading(true);
    setNchat(false);
    console.log(currTID,prompt)
    let options = {
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message: prompt, 
        threadId: currTID
      })
    }

    try{
      const res = await fetch( "https://major-project-2-z7bc.onrender.com/api/chat",options);
      const data = await res.json();
      console.log(data);
      setReply(data.reply);
    }catch(err){
      console.log(err);
    }
    setLoading(false);

  };

 useEffect(() => {
  if (!reply) return;

  setChat(prevchat => [
    ...prevchat,
    { role: "user", content: prompt },
    { role: "assistant", content: reply }
  ]);
  
  setShouldAnimate(true);

  setPrompt("");
  setReply("");
}, [reply]);


const handleProfileCLick = () => {
  setIsOpen(!isOpen);
};


  return (
    <div className="chatwindow">
      <div className="navbar">
        <span>Askora <i className="fa-solid fa-angle-down"></i></span>
      <div className="userIcon" onClick={handleProfileCLick}>
        <span><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      {
        isOpen && <div className="dropdown">

          <div className="dropdownitem"><i class="fa-solid fa-gear"></i> Settings</div>
          <div className="dropdownitem"><i class="fa-solid fa-right-from-bracket"></i> Logout</div>
          <div className="dropdownitem"><i class="fa-solid fa-life-ring"></i> Help</div>

        </div>
      }



      <Chat></Chat>

      <div className="loaderContainer">
        <CircleLoader color="#fff"  loading={loading} />
      </div>
    

      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder="Ask anything" value={prompt} onChange={(e)=>{setPrompt(e.target.value)}} onKeyDown={(e) => {
  if (e.key === "Enter" && !loading && prompt.trim()) {
    e.preventDefault();
    getRES();
  }
}}
 />
          <div id="submit" onClick={getRES} >
            <i className="fa-solid fa-square-arrow-up-right"></i></div>
        </div>
        <p className="info">Askora can make mistakes. Check important info. See Cookie Prefernces</p>
      </div>
    </div>
    
  );
};



export default ChatWindow;


