import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box
} from "@mui/material";
import { sentenceCase } from "change-case";
import flags from "@/constants/flags.json";
import { storageService } from "@/services";
import { FC, useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CountryItem } from "@/interfaces/program.interface";

type Continents = {
  [key: string]: {
    id: number;
    name: string;
    code: string;
    vat: number;
    continent: string;
    currencyId: number;
  }[];
};

interface CountryModalProps {
  open: boolean;
  handleClose: () => void;
  countries: CountryItem[];
  currencies: any;
  selectedCountry: { id: number; name: string } | null;
  selectedCurrency: { id: number; name: string } | null;
  setSelectedCountry: React.Dispatch<{ id: number; name: string }>;
  setSelectedCurrency: React.Dispatch<{ id: number; name: string }>;
}

const CountryModal: FC<CountryModalProps> = ({
  open,
  handleClose,
  countries,
  currencies,
  selectedCountry,
  selectedCurrency,
  setSelectedCountry,
  setSelectedCurrency
}) => {
  const [continents, setContinents] = useState<Continents | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [country, setCountry] = useState<{
    id: number;
    name: string;
    code?: string;
  } | null>(selectedCountry);
  const [currency, setCurrency] = useState<{ id: number; name: string } | null>(
    selectedCurrency
  );

  const handleContinentClick = (continent: string) => {
    setSelectedContinent(continent);
  };
  const handleApplyClick = () => {
    if (country?.id) {
      setSelectedCountry(country);
      storageService.setToLocalStorage("country", country);
    }
    if (currency?.id) {
      setSelectedCurrency(currency);
      storageService.setToLocalStorage("currency", currency);
    }
  };

  useEffect(() => {
    const continents: Continents = {};
    if (countries?.length === 0) return;
    countries.forEach((item) => {
      const continent: string = item?.continent;
      if (!continents[continent]) {
        continents[continent] = [];
      }
      continents[continent].push(item);
    });

    setContinents(continents);

    if (Object.keys(continents).length > 0) {
      setSelectedContinent(Object.keys(continents)[0]);
    }
  }, [countries]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Typography variant="h5" sx={{ fontSize: { xs: "20px", md: "25px" } }}>
          Select your preferred country/region and currency
        </Typography>
      </DialogTitle>

      <CloseOutlinedIcon
        sx={{ position: "absolute", right: 5, top: 5, cursor: "pointer" }}
        onClick={handleClose}
      />
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            flexDirection: { xs: "column", md: "row" }
          }}
        >
          {/* Continents & Countries */}
          <Box sx={{ width: { xs: "100%", md: "70%" }, height: "100%" }}>
            <Box sx={{ px: 2 }}>
              {!continents && <Typography fontWeight={500}>Preferred Country</Typography>}
            </Box>
            {/* Continents */}
            <Box sx={{ display: "flex", gap: 4, px: 2 }}>
              {continents &&
                Object.keys(continents)?.map((continent) => (
                  <Box key={continent} position={"relative"}>
                    <Typography
                      onClick={() => handleContinentClick(continent)}
                      sx={{ cursor: "pointer" }}
                    >
                      {sentenceCase(continent || "")}
                    </Typography>
                    {continent === selectedContinent && (
                      <Box
                        sx={{
                          position: "absolute",
                          width: "0px",
                          height: "0px",
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderBottom: "8px solid #EBEDF6",
                          right: "50%"
                        }}
                      >
                        {" "}
                      </Box>
                    )}
                  </Box>
                ))}
            </Box>
            {/* Countries */}
            <Box
              sx={{
                bgcolor: "#EBEDF6",
                minHeight: "300px",
                height: "600px",
                mt: 1,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap"
              }}
            >
              {selectedContinent &&
                continents &&
                continents[selectedContinent]?.map((countryData) => {
                  const flag = flags[countryData?.code as keyof typeof flags];

                  return (
                    <Box
                      key={countryData.id}
                      sx={{
                        px: 2,
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        py: 1,
                        cursor: "pointer",
                        color: country?.id === countryData.id ? "#3464B3" : "#000"
                      }}
                    >
                      <Box
                        sx={{
                          width: "18px",
                          height: "12px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <img
                          src={`data:image/svg+xml;utf8,${encodeURIComponent(flag)}`}
                          alt={`${countryData?.name} flag`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                          }}
                        />
                      </Box>

                      <Typography
                        onClick={() => {
                          setCountry({
                            id: countryData?.id,
                            name: countryData?.name,
                            code: countryData?.code
                          });
                        }}
                        sx={{ pb: "2px" }}
                      >
                        {countryData?.name || ""}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
          {/* Currencies */}
          <Box sx={{ width: { xs: "100%", md: "30%" }, height: "100%" }}>
            <Box sx={{ px: 2 }}>
              <Typography fontWeight={500}>Preferred Currency</Typography>
            </Box>

            <Box sx={{ bgcolor: "#EBEDF6", minHeight: "300px", height: "600px", mt: 1 }}>
              {currencies?.map((currencyData: any) => {
                return (
                  <Box
                    key={currencyData?.id}
                    sx={{
                      px: 2,
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      py: 1,
                      cursor: "pointer",
                      color: currency?.id === currencyData?.id ? "#3464B3" : "#000"
                    }}
                    onClick={() =>
                      setCurrency({
                        id: currencyData?.id,
                        name: currencyData?.iso3CurrencyCode
                      })
                    }
                  >
                    <Typography>{currencyData?.iso3CurrencyCode}</Typography> -{" "}
                    <Typography>{currencyData?.currencyName}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();
              handleApplyClick();
            }}
            style={{ marginTop: "20px" }}
          >
            Apply Selection
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal;
