import React, { useState, ChangeEvent } from "react";
import { Box, Button, Typography } from "@mui/material";

interface IFileUploadInputProps {
  onFileChange?: (file: File | null) => void;
  error?: boolean;
  helperText?: string;
}

const FileUploadInput: React.FC<IFileUploadInputProps> = ({
  onFileChange,
  error,
  helperText,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (onFileChange) {
      onFileChange(file || null);
    }
  };

  return (
    <Box sx={{ position: "relative"}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "54px",
          width: {
            mobile: "328px",
            tablet: "380px",
            laptop: "380px",
            desktop: "380px",
          },
          border: error ? "2px solid #d32f2f" : "1px solid #D0CFCF",
          borderRadius: "4px",
          overflow: 'hidden', 
        }}
      >
        <label htmlFor="file-upload">
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            component="span"
            sx={{
              height: "54px",
              bgcolor: "inherit",
              border: error ? "2px solid #d32f2f" : "1px solid black",
              borderRadius: "4px 0 0 4px",
              color: "black",
              textTransform: "capitalize",
              "&:hover": {
                border: error ? "2px solid #d32f2f" : "2px solid black",
                bgcolor: "inherit",
              },
            }}
          >
            Upload
          </Button>
        </label>
        {selectedFile ? (
          <Typography
            variant="body1"
            sx={{ ml: "16px", color: "#7E7E7E", whiteSpace: "nowrap", 
            overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            Selected File: {selectedFile.name}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ ml: "16px", color: "#7E7E7E" }}>
            Upload your photo
          </Typography>
        )}
      </Box>
      {helperText && (
        <Typography
          variant="body2"
          color={error ? "#d32f2f" : "text.secondary"}
          sx={{
            position: "absolute",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploadInput;
