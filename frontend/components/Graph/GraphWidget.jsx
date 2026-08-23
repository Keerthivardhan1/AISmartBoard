import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Desmos from "desmos";
import "./GraphWidget.css";

export default function GraphWidget({
  expression,
  x = 200,
  y = 100,
  width = 500,
  height = 350,
}) {
  const calculatorRef = useRef(null);
  console.log("expression , " , exper);
  

  useEffect(() => {
    if (!calculatorRef.current) return;

    const calculator = Desmos.GraphingCalculator(calculatorRef.current, {
      expressions: true,
      keypad: true,
      settingsMenu: true,
      zoomButtons: true,
      invertedColors: true,
    });

    calculator.setExpression({
      id: "graph",
      latex: expression,
    });

    return () => calculator.destroy();
  }, [expression]);

  return (
    
    <div
      className="graph-widget"
      style={{
        left: x,
        top: y,
        width,
        height,
      }}
    >
      <div
        ref={calculatorRef}
        className="graph-container"
      />
    </div>
  );
}