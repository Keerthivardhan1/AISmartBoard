import { useEffect, useState } from "react";
import { ChartLine, Bot, X, SquareFunction } from "lucide-react";
import "./Widget.css";
import Chat from "./Chat";
import AllEquations from "../Graph/AllEquations";

export default function Widget({
  isGenerating,
  toggleGenerateGraph,
  handleGenerateGraph,
}) {
  const [expanded, setExpanded] = useState(false);
  const [fullExpand, setFullExpand] = useState(false);
  const [activeTab, setActiveTab] = useState(2)

  const [graphText, setGraphText] = useState("Generate Graph");

  useEffect(() => {
    setGraphText(
      isGenerating
        ? "Generating..."
        : toggleGenerateGraph
        ? "Close Graph"
        : "Generate Graph"
    );
  }, [isGenerating, toggleGenerateGraph]);


  const features = [
    {
      name: "Graph",
      description: "Generate graphs for mathematical equations.",
      icon: <ChartLine className="widget-icon" />,
      onClick: handleGenerateGraph,
      label: graphText,
      component:<p>...</p>
    },
    {
      name: "AI",
      description: "Get help with mathematical problems.",
      icon: <Bot className="widget-icon" />,
      onClick: () => {},
      label: "AI",
      component:<Chat/>
    },
    {
      name:"Equatioins",
      description:"Show all equations",
      icon: <SquareFunction className="widget-icon"  />,
      onClick:()=>{},
      label:'Show equations',
      component: <span className="no-equ" >This feature is under development</span>
      
    }
  ];

  const handleFeatureClick = (item, ind) => {
    setFullExpand(true);
    setActiveTab(ind)
    item.onClick();
  };

  return (
    <div
      className={`widget-container ${
        fullExpand ? "widget-full" : ""
      } ${expanded ? "widget-expanded" : ""}`}
      onMouseEnter={() => {
        if (!fullExpand) {
          setExpanded(true);
        }
      }}
      onMouseLeave={() => {
        if (!fullExpand) {
          setExpanded(false);
        }
      }}
    >
      {/* Header */}
      {fullExpand && (
        <div className="widget-header">
          <span>SmartBoard</span>

          <button
            className="widget-close"
            onClick={() => setFullExpand(false)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {!fullExpand && (
        <div className="widget-features" >
          {features.map((item, ind) => (
            <button
              key={item.name}
              className="widget-item"
              onClick={() => handleFeatureClick(item, ind)}
              disabled={
                item.name === "Graph" ? isGenerating : false
              }
              style={{
                border:activeTab===item.name ? '2px solid green':'',
                borderRadius: '1rem'
              }}
            >
              {item.icon}

              {expanded && (
                <span className="widget-label">
                  {item.label}
                </span>
              )}

              <div className="tooltip">
                {item.description}
              </div>
            </button>
          ))}
        </div>
      )}

      {fullExpand && (
        <div className="widget-content">
          {features[activeTab].component}
        </div>
      )}
    </div>
  );
}