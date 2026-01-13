import "./sidebar.css";
import {MyContext} from "./myContext.jsx";
import { useContext,useState,useEffect } from "react";
import { v1 as uuidv1 } from "uuid";




function Sidebar() {
  const {allThreads, setAllThreads, currTIDprompt,setPrompt,reply,setReply,currTID,setTID,prevChats,setChat,newChat,setNchat,shouldAnimate,setShouldAnimate}= useContext(MyContext);

  const getAllThreads = async()=>{
    try{
      const response= await fetch("https://major-project-2-z7bc.onrender.com/api/threads")
      const data = await response.json();

      const filteredData= data.map(thread=>({threadId: thread.threadId, title: thread.title}));
      setAllThreads(filteredData);

    }catch(err){
      console.log(err);
    };

  }
  useEffect(()=>{
    getAllThreads()
  },[])

  const createNewchat=()=>{

    setNchat(true);
    setPrompt("");
    setReply(null);
    setTID(uuidv1());
    setChat([]);
    setShouldAnimate(false);
  }


  const getData =async (newTID)=>{
    try {
     const res = await fetch(`https://major-project-2-z7bc.onrender.com/api/thread/${newTID}`);
     const data= await res.json();
     console.log(data);

     setTID(newTID); 
     setChat(data.messages);
     setNchat(false);
     setReply(null);
     setShouldAnimate(false);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteThread= async(threadId)=>{
    try {
      const res= await fetch(`https://major-project-2-z7bc.onrender.com/api/thread/${threadId}`,{method:"DELETE"});
      const data= await res.json();
      console.log(data);

      setAllThreads(prev=> prev.filter(thread=> thread.threadId !== threadId));

      if(currTID === threadId){
        createNewchat();
      }
    } catch (error) {
      console.log(error)
    }
  }
  


  return (
    <section className="sidebar">
    <button onClick={()=>{createNewchat()}}>
      <img className="logo" src="https://res.cloudinary.com/dz6njjqhx/image/upload/v1768293218/blacklogo_jf93cv.png" alt="img" />
      <span><i className="fa-solid fa-pen-to-square"></i></span>
    </button>

    <ul className="history">
      {
        allThreads?.map((thread,idx)=>(
          <li key={thread.threadId} className={currTID===thread.threadId?"highlighted":""}
          onClick={(e)=>{getData(thread.threadId)}}
          >{thread.title} <i className="fa-solid fa-trash" onClick={(e)=>{
            e.stopPropagation();
            deleteThread(thread.threadId)}} ></i></li>
        ))
      }
    </ul>

    <p className="sign">By NDS</p>
    </section>
   
   
  );
}

export default Sidebar;
