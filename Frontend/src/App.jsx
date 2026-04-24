import "./App.css";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./myContext.jsx";
import { v4 as uuidv4 } from 'uuid';
import AuthPage from "./AuthPage.jsx";
import { API_BASE_URL } from "./config.js";



function App() {
  const[prompt, setPrompt]= useState("")
  const[reply,setReply]= useState("")
  const[prevChats,setChat]= useState([])
  const[newChat, setNchat]= useState(true)
  const[allThreads, setAllThreads]= useState([])
  const[shouldAnimate, setShouldAnimate]= useState(false)
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("askora_token") || "");
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const[currTID, setTID]= useState(uuidv4())

  useEffect(() => {
    const verifySession = async () => {
      if (!authToken) {
        setUser(null);
        setIsCheckingAuth(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Session expired");
        }

        setUser(data.user);
      } catch {
        localStorage.removeItem("askora_token");
        setAuthToken("");
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifySession();
  }, [authToken]);

  const handleAuthSuccess = (token, signedInUser) => {
    localStorage.setItem("askora_token", token);
    setAuthToken(token);
    setUser(signedInUser);
    setPrompt("");
    setReply("");
    setChat([]);
    setAllThreads([]);
    setNchat(true);
    setTID(uuidv4());
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("askora_token");
      setAuthToken("");
      setUser(null);
      setPrompt("");
      setReply("");
      setChat([]);
      setAllThreads([]);
      setNchat(true);
      setTID(uuidv4());
    }
  };

  const providerValue = {
    prompt,setPrompt,reply,setReply,currTID,setTID,prevChats,setChat,newChat,setNchat,allThreads,setAllThreads,shouldAnimate,setShouldAnimate,
    authToken,user,logout
  };

  if (isCheckingAuth) {
    return <div className="appLoader">Loading...</div>;
  }

  if (!authToken || !user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

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
