import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useAppContext } from "@/context/appContext";

export const ProfileInformation = () => {
  const { member } = useAppContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <InformationTab label={"Name"} value={`${member?.firstName} ${member?.lastName}`} />
      <InformationTab label={"Email"} value={member?.email} />
      <InformationTab label={"Member Id"} value={member?.memberId} />
    </Box>
  );
};

interface Props {
  label: string;
  value: string | undefined;
}

const InformationTab: FC<Props> = ({ label, value }) => {
  return (
    <Box sx={{ bgcolor: "#F1F4FA", borderRadius: "10px", padding: "10px 15px" }}>
      <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{label} :</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};
