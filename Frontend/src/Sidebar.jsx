import "./sidebar.css";
import {MyContext} from "./myContext.jsx";
import { useCallback, useContext, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import { apiRequest } from "./apiClient.js";




function Sidebar() {
  const {allThreads, setAllThreads, setPrompt, reply, setReply, currTID, setTID, setChat, setNchat, setShouldAnimate, authToken}= useContext(MyContext);

  const getAllThreads = useCallback(async()=>{
    if (!authToken) return;

    try{
      const data = await apiRequest("/api/threads", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const filteredData= data.map(thread=>({threadId: thread.threadId, title: thread.title}));
      setAllThreads(filteredData);

    }catch(err){
      console.log(err);
    };

  }, [authToken, setAllThreads])
  useEffect(()=>{
    getAllThreads()
  },[getAllThreads, reply])

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
     const data = await apiRequest(`/api/thread/${newTID}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
     });

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
      const data = await apiRequest(`/api/thread/${threadId}`, {
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
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
        allThreads?.map((thread)=>(
          <li key={thread.threadId} className={currTID===thread.threadId?"highlighted":""}
          onClick={()=>{getData(thread.threadId)}}
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
