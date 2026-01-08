import "./App.css";
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./myContext.jsx";
import { v4 as uuidv4 } from 'uuid';



function App() {
  const[prompt, setPrompt]= useState("")
  const[reply,setReply]= useState("")
  const[prevChats,setChat]= useState([])
  const[newChat, setNchat]= useState(true)
  const[allThreads, setAllThreads]= useState([])
  const[shouldAnimate, setShouldAnimate]= useState(false)

  const[currTID, setTID]= useState(uuidv4())
  const providerValue = {prompt,setPrompt,reply,setReply,currTID,setTID,prevChats,setChat,newChat,setNchat,allThreads,setAllThreads,shouldAnimate,setShouldAnimate};
  return(
    <div className="app">
      <MyContext.Provider value={providerValue}>
       <Sidebar></Sidebar>
       <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}
export default App;