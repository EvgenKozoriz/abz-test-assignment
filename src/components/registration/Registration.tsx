import React, { useEffect, useState } from "react";
import { Element } from "react-scroll";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import FileUploadInput from "./FileUploadInput";
import CustomButton from "../CustomButton";
import successImgPath from "../../Assets/success-image.svg";

interface IPositionsData {
  id: number;
  name: string;
}

interface IFormData {
  name: string;
  email: string;
  phone: string;
  positionId: string;
  photo: File | null;
}

interface RegistrationProps {
  onRegistrationSuccess: () => void;
}

const Registration: React.FC<RegistrationProps> = ({
  onRegistrationSuccess,
}) => {
  const [positions, setPositions] = useState<IPositionsData[]>([]);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    phone: "",
    positionId: "",
    photo: null,
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const fetchPositions = async () => {
    try {
      const response = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
      );
      const data = await response.json();

      if (data.success) {
        const newPositions = data.positions.map((position: IPositionsData) => ({
          id: position.id,
          name: position.name,
        }));

        setPositions(newPositions);
      } else {
        console.error("Failed to fetch positions");
      }
    } catch (error) {
      console.error("Error fetching positions: ", error);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const setFormValue = (field: string, value: any) => {
    setValidationErrors({});

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.name, e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue("positionId", e.target.value);
  };

  const handlePhotoChange = (photo: File | null) => {
    setFormValue("photo", photo);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    // Validate name
    if (formData.name.length < 2 || formData.name.length > 60) {
      errors.name = "Name should be 2-60 characters";
    }
    // Validate email
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    // Validate phone
    const phoneRegex = /^[+]{0,1}380([0-9]{9})$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone should start with +380 and have 12 digits";
    }
    // Validate positionId
    if (!formData.positionId) {
      errors.positionId = "Please select a position";
    }
    // Validate photo
    if (!formData.photo) {
      errors.photo = "Please upload a photo";
    } else if (
      !["image/jpeg", "image/jpg"].includes(formData.photo.type) ||
      formData.photo.size > 5 * 1024 * 1024
    ) {
      errors.photo =
        "Photo should be a jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const getToken = async () => {
    try {
      const tokenResponse = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      );
      const tokenData = await tokenResponse.json();

      if (tokenData.success) {
        return tokenData.token;
      } else {
        console.error("Failed to get token:", tokenData);
        return null;
      }
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const token = await getToken();

        if (!token) {
          console.error("Token is not available.");
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("position_id", formData.positionId);
        if (formData.photo) {
          formDataToSend.append("photo", formData.photo);
        }

        const response = await fetch(
          "https://frontend-test-assignment-api.abz.agency/api/v1/users",
          {
            method: "POST",
            body: formDataToSend,
            headers: {
              Token: token,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          console.log("Registration successful:", data);
          onRegistrationSuccess();

          setDisplaySuccess(true);

          setTimeout(() => {
            setDisplaySuccess(false);
          }, 5_000);
        } else {
          console.log("Registration failed:", data);
        }
      } catch (error) {
        console.error("Error during registration: ", error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  if (displaySuccess) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: '50px'
        }}
      >
        <Typography variant="h1">User successfully registered</Typography>
        <img src={successImgPath} alt="success img" />
      </Box>
    );
  }

  return (
    <Element name="registration">
      <Box
        sx={{
          Width: {
            mobile: "328px",
            tablet: "704px",
            laptop: "1024px",
            desktop: "1170px",
          },
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ textAlign: "center", mb: "50px" }}>
          Working with POST request
        </Typography>
        <Box
          sx={{
            width: {
              mobile: "328px",
              tablet: "380px",
              laptop: "380px",
              desktop: "380px",
            },
            mb: "50px",
          }}
        >
          <TextField
            label="Your Name"
            fullWidth
            color="secondary"
            sx={{ mb: "50px" }}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={Boolean(validationErrors.name)}
            helperText={validationErrors.name}
          />
          <TextField
            label="Email"
            fullWidth
            color="secondary"
            sx={{ mb: "50px" }}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={Boolean(validationErrors.email)}
            helperText={validationErrors.email}
          />
          <TextField
            label="Phone"
            fullWidth
            color="secondary"
            sx={{ mb: "30px" }}
            helperText="+38 (XXX) XXX - XX - XX"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={Boolean(validationErrors.phone)}
          />
          <FormControl sx={{ mb: "47px" }}>
            <FormLabel id="demo-radio-buttons-group-label" color="secondary">
              Select your position
            </FormLabel>
            <RadioGroup
              name="radio-buttons-group"
              value={formData.positionId}
              onChange={handlePositionChange}
            >
              {positions.map((position) => (
                <FormControlLabel
                  key={position.id}
                  value={position.id.toString()}
                  control={<Radio color="secondary" />}
                  label={position.name}
                />
              ))}
            </RadioGroup>
            {validationErrors.positionId && (
              <Typography color="error">
                {validationErrors.positionId}
              </Typography>
            )}
          </FormControl>
          <FileUploadInput
            onFileChange={handlePhotoChange}
            error={Boolean(validationErrors.photo)}
            helperText={validationErrors.photo}
          />
        </Box>
        <CustomButton
          type="submit"
          label="Sign up"
          isDisabled={Object.keys(validationErrors).length > 0}
          onClick={handleSubmit}
        />
      </Box>
    </Element>
  );
};

export default Registration;
