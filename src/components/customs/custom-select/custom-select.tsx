import { grey } from "@mui/material/colors";
import { ChangeEventHandler } from "react";
import { MenuItem, Typography, TextField, Box, InputLabel } from "@mui/material";

type Option = {
  value: string | number;
  label: string | number;
};

type Props = {
  name: string;
  options: Option[] | [];
  value: any;
  label?: string;
  size?: "small" | "medium";
  placeholder: string;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

// Custom Select Component
const CustomSelect = ({
  name,
  options,
  value,
  label,
  onChange,
  placeholder,
  size = "medium",
  disabled = false
}: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <InputLabel
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "black",
            fontFamily: "Poppins",
            mb: 1
          }}
        >
          {label}
        </InputLabel>
      )}
      <TextField
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        select
        SelectProps={{
          displayEmpty: true,
          renderValue: (selected) => {
            const option = options.find((option) => option.value === selected);
            return option ? (
              option.label
            ) : (
              <Typography color={grey[500]}>{placeholder}</Typography>
            );
          }
        }}
        value={value}
        onChange={onChange}
        fullWidth
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option?.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default CustomSelect;
