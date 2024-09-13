import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, InputLabel } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-mui";
import { FC, useState } from "react";

interface IProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const CustomTextField: FC<IProps> = ({ label, name, type, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      <InputLabel sx={{ fontSize: "20px", fontWeight: 600, color: "black" }}>
        {label}
      </InputLabel>
      {type === "password" ? (
        <Field
          component={TextField}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          name={name}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      ) : (
        <Field component={TextField} type={type} placeholder={placeholder} name={name} />
      )}
    </Box>
  );
};

export default CustomTextField;
