import { useEffect, useState } from "react";
import { ChartLine, Bot, X } from "lucide-react";
import "./Widget.css";
import Chat from "./Chat";

export default function Widget({
  isGenerating,
  toggleGenerateGraph,
  handleGenerateGraph,
}) {
  const [expanded, setExpanded] = useState(false);
  const [fullExpand, setFullExpand] = useState(false);

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
    },
    {
      name: "AI",
      description: "Get help with mathematical problems.",
      icon: <Bot className="widget-icon" />,
      onClick: () => {},
      label: "AI",
    },
  ];

  const handleFeatureClick = (item) => {
    setFullExpand(true);
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
        <div className="widget-features">
          {features.map((item) => (
            <button
              key={item.name}
              className="widget-item"
              onClick={() => handleFeatureClick(item)}
              disabled={
                item.name === "Graph" ? isGenerating : false
              }
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
          <Chat />
        </div>
      )}
    </div>
  );
}