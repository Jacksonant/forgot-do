import { useState } from "react";
import "./PieChart.css";

interface PieChartProps {
  completed: number;
  total: number;
}

export const PieChart = ({ completed, total }: PieChartProps) => {
  const [blueHovered, setBlueHovered] = useState(false);
  const [grayHovered, setGrayHovered] = useState(false);

  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const angle = (percentage / 100) * 360;

  // Calculate path for completed section
  const getPath = () => {
    if (percentage === 0) return "";
    if (percentage === 100)
      return "M 100 100 m -80 0 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0";

    const radians = (angle - 90) * (Math.PI / 180);
    const x = 100 + 80 * Math.cos(radians);
    const y = 100 + 80 * Math.sin(radians);
    const largeArc = angle > 180 ? 1 : 0;

    return `M 100 100 L 100 20 A 80 80 0 ${largeArc} 1 ${x} ${y} Z`;
  };

  return (
    <div className="pie-chart-container">
      <svg viewBox="0 0 200 200" className="pie-chart">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="#E5E7EB"
          style={{
            transform: grayHovered ? "scale(1.05)" : "scale(1)",
            transformOrigin: "center",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={() => setGrayHovered(true)}
          onMouseLeave={() => setGrayHovered(false)}
        />

        {/* Completed section */}
        {percentage > 0 && (
          <path
            d={getPath()}
            fill="#5285EC"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            style={{
              transform: blueHovered ? "scale(1.05)" : "scale(1)",
              transformOrigin: "center",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={() => setBlueHovered(true)}
            onMouseLeave={() => setBlueHovered(false)}
          />
        )}
      </svg>

      {/* Default line and label for completed tasks */}
      {completed > 0 && (
        <>
          <svg className="pie-chart-line" viewBox="0 0 200 200">
            <line
              x1="150"
              y1="80"
              x2="200"
              y2="50"
              stroke="#5285EC"
              strokeWidth="1.5"
            />
          </svg>
          <div className="pie-chart-label-default">
            Completed
            <br />
            Tasks
          </div>
        </>
      )}

      {/* Tooltip on hover */}
      {blueHovered && (
        <div className="pie-chart-tooltip">
          <div className="pie-chart-label">Completed Tasks</div>
          <div className="pie-chart-divider"></div>
          <div className="pie-chart-value">{completed}</div>
        </div>
      )}

      {grayHovered && (
        <div className="pie-chart-tooltip pie-chart-tooltip-left">
          <div className="pie-chart-label">Incomplete Tasks</div>
          <div className="pie-chart-divider"></div>
          <div className="pie-chart-value">{total - completed}</div>
        </div>
      )}
    </div>
  );
};
