import React from "react";
import CustomSlider from "./Slider";
import { Typography, Box } from "@mui/material";
import { theme } from "@/theme";

interface AmountTabsProps {
  amounts: number[];
  selectedAmount: string;
  currency: string | undefined;
  onAmountClick: (amount: number) => void;
}

const AmountTabs: React.FC<AmountTabsProps> = ({
  amounts,
  currency,
  selectedAmount,
  onAmountClick
}) => {
  return (
    <CustomSlider settings={{ slidesToShow: 5, slidesToScroll: 2 }}>
      {amounts.map((amount) => (
        <Box
          key={amount}
          onClick={() => onAmountClick(amount)}
          sx={{
            padding: "8px 0px",
            backgroundColor: theme.palette.action.active,
            borderRadius: "12px",
            cursor: "pointer",
            textAlign: "center",
            minWidth: "60px",
            border: `${selectedAmount === amount.toString() ? "1px solid #000" : ""}`
          }}
        >
          <Typography>
            {currency} {amount}
          </Typography>
        </Box>
      ))}
    </CustomSlider>
  );
};

export default AmountTabs;
