import { useEffect, useState } from "react";
import GraphWidget from "../components/Graph/GraphWidget";
import SmartBoard from "../components/SmartBoard/SmartBoard";
import LandingPage from "../components/landing/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    // const [userId , setUserId] = useState(undefined)
    useEffect(()=>{
        let user_id = localStorage.getItem("userId")
        if (!user_id){
            const new_userId = crypto.randomUUID()
            localStorage.setItem("userId", new_userId)
            // setUserId(new_userId)
            user_id = new_userId
        }
        // "X-User-Id": userId, # do not use same state variable in side useEffect

        const start_session = async ()=>{
            const BACKEND_URL =import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
            const response = await fetch(`${BACKEND_URL}/start-session`, {
            headers:{
                "X-User-Id": user_id, 
            },
            credentials: "include",
            method: "POST",
            });

            const data = await response.json();
            console.log("api response for start session : ", data);
        }

        start_session()
        
    },[])
    // return <SmartBoard/>;
    // return <GraphWidget
    //     expression={"x^2-3x+2"}
    // />
    return(<BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/smartboard" element={<SmartBoard />} />

                {/* <Route
                    path="/graph"
                    element={
                        <GraphWidget expression={"x^2-3x+2"} />
                    }
                /> */}
            </Routes>
        </BrowserRouter>)
}

export default App;