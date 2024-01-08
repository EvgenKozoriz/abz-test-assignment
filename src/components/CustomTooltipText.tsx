import React, { useRef, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface ITooltipTextProps {
  text: string;
  styles?: React.CSSProperties;
}

const CustomTooltipText: React.FC<ITooltipTextProps> = ({ text, styles }) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = tooltipRef.current;

    if (el) {
      const overflowed =
        el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight;
      setIsOverflowed(overflowed);
    }
  }, [text, styles]);


  return (
    <Tooltip title={isOverflowed ? text : ""} placement="bottom">
      <Typography
        variant="body1"
        component="div"
        color="text.primary"
        ref={tooltipRef}
        sx={{
          textAlign: "center",
          width: {
            mobile: "288px",
            tablet: "304px",
            laptop: "242px",
            desktop: "330px",
          },
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: "3",
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

export default CustomTooltipText;
