import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import { useEffect, useRef, useState } from "react";
import "./SmartBoard.css";
import GraphWidget from "../Graph/GraphWidget";
import Widget from "../FeaturesWidget/Widget";

export default function SmartBoard() {


  const excalidrawRef = useRef(null);
  const [userId , setUserId] = useState(undefined)

  const [selectedElements, setSelectedElements] = useState([]);
  const [selectionBox, setSelectionBox] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [toggleGenerateGraph, setToggleGenerateGraph] = useState(false);
  const [equation, setEquation] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const WIDGET_WIDTH = 500;
  const WIDGET_HEIGHT = 350;
  const MARGIN = 16;

  function getWidgetPosition(x, y) {
    const maxX = window.innerWidth - WIDGET_WIDTH - MARGIN;
    const maxY = window.innerHeight - WIDGET_HEIGHT - MARGIN;

    return {
      x: Math.max(MARGIN, Math.min(x, maxX)),
      y: Math.max(MARGIN, Math.min(y, maxY)),
    };
  }

  useEffect(() => {
    console.log("showbtn ", selectionBox);
  }, [selectionBox]);



  useEffect(()=>{
    setUserId(localStorage.getItem("userId"))
  },[])

  const handleGenerateGraph = async () => {
    // setIsGenerating(true);
    if (toggleGenerateGraph) {
      setToggleGenerateGraph(false);
      // isGenerating(false)
      return;
    }
    setIsGenerating(true);
    try {
      
    const api = excalidrawRef.current;

    if (!api || selectedElements.length === 0) {
      alert("Select an equation first.");
      return;
    }

    const blob = await exportToBlob({
      elements: selectedElements,
      appState: {
        ...api.getAppState(),
        exportBackground: false,
      },
      files: api.getFiles(),
      mimeType: "image/png",
    });

    console.log(blob);

    const formData = new FormData();

    formData.append("image", blob, "equation.png");

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const response = await fetch(`${BACKEND_URL}/equation`, {
      headers:{
        "X-User-Id": userId,
      },
      credentials: "include",
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("api response for graph generation : ", data);

    setEquation(data.latex);

    const url = URL.createObjectURL(blob);
    // window.open(url);
    setToggleGenerateGraph(true);
    } catch (error) {
      console.log(error)
    }finally{

      
      setIsGenerating(false);
    }
  };

  const updateSelection2 = (elements, appState) => {
    const selected = elements.filter(
      (element) => appState.selectedElementIds[element.id],
    );

    setSelectedElements(selected);

    if (selected.length === 0) {
      setSelectionBox(null);
      return;
    }

    const minX = Math.min(...selected.map((e) => e.x));
    const minY = Math.min(...selected.map((e) => e.y));
    const maxX = Math.max(...selected.map((e) => e.x + e.width));
    const maxY = Math.max(...selected.map((e) => e.y + e.height));

    const { scrollX, scrollY, zoom } = appState;

    setSelectionBox({
      left: (minX + scrollX) * zoom.value,
      top: (minY + scrollY) * zoom.value,
      width: (maxX - minX) * zoom.value,
      height: (maxY - minY) * zoom.value,
    });
  };
  const updateSelection = () => {
    const api = excalidrawRef.current;

    const elements = api.getSceneElements();
    const appState = api.getAppState();

    const selected = elements.filter((e) => appState.selectedElementIds[e.id]);

    console.log(selected);

    const rightX = Math.max(...selected.map((e) => e.x + e.width));
    const minY = Math.min(...selected.map((e) => e.y));
    // const maxX = Math.max(...selected.map((e) => e.x + e.width));
    // const maxY = Math.max(...selected.map((e) => e.y + e.height));

    // const pos = getWidgetPosition(e.x+e.width, e.y);

    const { scrollX, scrollY, zoom } = appState;

    setPosition({
      x: (rightX + scrollX) * zoom.value + 16,
      y: (minY + scrollY) * zoom.value,
    });

    // setPosition({
    //   x: pos.x,
    //   y: pos.y,
    // });

    setSelectedElements(selected);
    setShowButton(selected.length > 0);
  };
  return (
    <div className="smart-board">
      <Excalidraw
        // theme="dark"
        excalidrawAPI={(api) => {
          excalidrawRef.current = api;
        }}
        onPointerUp={updateSelection}
      />

      {showButton && (
        <button
          theme="dark"
          disabled={isGenerating}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 999999,
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={handleGenerateGraph}
        >
          {isGenerating
            ? "Generating..."
            : toggleGenerateGraph
              ? "Close Graph"
              : "Generate Graph"}
        </button>
      )}

      {/* <p style={{
            position: "fixed",
            top: 0,
            right: 200,
            zIndex: 999999,
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
          >{userId}</p> */}

      {toggleGenerateGraph && (
        <div>
          <GraphWidget expression={equation} x={position.x} y={position.y} />
          <button onClick={() => setToggleGenerateGraph(false)}>Close</button>
        </div>
      )}

      <div>
        <Widget isGenerating={isGenerating} toggleGenerateGraph={toggleGenerateGraph} handleGenerateGraph={handleGenerateGraph} />
      </div>

    </div>
  );
}
