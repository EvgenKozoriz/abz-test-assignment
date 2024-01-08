import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { useTheme } from "@mui/material";

interface IProps extends ButtonProps {
  label: string;
  styles?: React.CSSProperties;
  isDisabled?: boolean;
}

const CustomButton: React.FC<IProps> = ({
  label,
  styles,
  isDisabled,
  ...buttonProps
}) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        borderRadius: "80px",
        textTransform: "capitalize",
        fontFamily: theme.typography.body1.fontFamily,
        fontWeight: theme.typography.body1.fontWeight,
        fontSize: theme.typography.body1.fontSize,
        lineHeight: theme.typography.body1.lineHeight,
        color: theme.palette.text.primary,
        "&:hover": {
          backgroundColor: "#FFE302",
        },
        "&:disabled": {
          backgroundColor: "#B4B4B4",
          color: "rgba(255, 255, 255, 0.87)",
        },
        ...styles,
      }}
      color="primary"
      variant="contained"
      disabled={isDisabled}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
