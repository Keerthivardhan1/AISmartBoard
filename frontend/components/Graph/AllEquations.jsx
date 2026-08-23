import { ChartLine, EqualApproximately, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import GraphWidget from "./GraphWidget";

function AllEquations() {
  const [equations, setEquations] = useState([]);
  const [equation_id , setEquationID] = useState()
  const [toggleGenerateGraph, setToggleGenerateGraph] = useState(false);

  useEffect(() => {
    const getAllEquations = async () => {
      const user_id = localStorage.getItem("userId");
      if (!user_id) {
      }
      const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

      try {
        const response =await fetch(`${BACKEND_URL}/equations`, {
          headers: {
            "X-User-Id": user_id,
          },
          credentials: "include",
          method: "GET",
        });
        const data = await response.json();
        console.log("getAllEuations res : ", data);
        setEquations(data);
      } catch (error) {
        console.log(`error while fetching all the equations : ${error}`);
        toast.error(error.message);
      }
    };

    getAllEquations();
  }, []);

  const handleDispalyGraph = (id)=>{
                console.log("equ clicked");
                if( !id){
                    console.log("Empty equation id:", id);
                }
                console.log("Equation: ", equations[id]);
                setEquationID(id)
                setToggleGenerateGraph(true)
    }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, rotate: -2 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "4px",
          maxHeight: "40vh",
          margin: "1rem",
          overflowY: "scroll",
          border: "2px solid black",
          borderRadius: "1rem",
        }}
      >
        <h4>Equations</h4>
        {equations.length==0 && <span className="no-equ" >no equations created</span>}
        {equations.map((equation, ind) => (
          <div
            key={ind}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              cursor: "pointer",
              padding: "2px",
            }}
          >
            <span>{equation}</span>
            <div>
              <button className="btn-s"
              onClick={handleDispalyGraph()}
              >
                <ChartLine />
              </button>
              <button className="btn-s">
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
        
      </motion.div>
    </>
  );
}

export default AllEquations;
