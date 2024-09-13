import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import { object, number, string } from "yup";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import cards from "@/assets/login/Card.png";
import { storageService } from "@/services";
import { loginService } from "@/services/auth.service";
import { useAppContext } from "@/context/appContext";
import loginBanner from "@/assets/login/login-banner.jpeg";
import { ILoginValues } from "@/interfaces/auth.interface";
import CustomTextField from "@/components/customs/custom-textfield/custom-textfield";
import { theme } from "@/theme";

const validationSchema = object().shape({
  username: number()
    .typeError("Member Id must be a number")
    .required("Member Id is required"),
  password: string().required("Password is required")
});

const Login = () => {
  const navigate = useNavigate();

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { setMember, setPoints, programCode, programDetails } = useAppContext();

  const handleSubmit = async (values: ILoginValues) => {
    const response = await loginService({ ...values, programCode });
    setMember(response);
    setPoints(response?.pointBalance || 0);
    storageService.setToLocalStorage("points", response?.pointBalance);
    storageService.setToLocalStorage("jwtToken", response?.jwtToken);
    storageService.setToLocalStorage("member", {
      ...response,
      refreshToken: null,
      token: null,
      jwtToken: null
    });
    enqueueSnackbar("Login successful", { variant: "success" });
    navigate("/");
  };

  const logo = programDetails?.programLogoUri
    ? import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + programDetails?.programLogoUri
    : "/assets/logo/loyyal-logo.svg";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        p: 2,
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Box
        sx={{
          display: isMdScreen ? "none" : "block",
          width: "60%",
          position: "relative"
        }}
      >
        <img
          src={loginBanner}
          alt="login-banner"
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: "10px", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "10%",
            width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
            height: "100%",
            transform: "translateY(-50%)",
            maxWidth: "100%",
            maxHeight: "100%"
          }}
        >
          <img
            src={cards}
            alt="cards"
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: isMdScreen ? "100%" : "45%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Formik
          initialValues={{
            username: "",
            password: "",
            programCode
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Box
                sx={{
                  width: isMdScreen ? "100%" : "400px"
                }}
              >
                <Box mb={2}>
                  <img src={logo} alt="loyyal" width={"100px"} />
                </Box>

                <Typography variant="h4" mb={3}>
                  Hello, Welcome
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px"
                  }}
                >
                  <CustomTextField
                    name="username"
                    label="Member Id"
                    type="text"
                    placeholder="Enter Member Id"
                  />

                  <CustomTextField
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                  />

                  <LoadingButton
                    size="large"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                    onClick={submitForm}
                    sx={{ mt: "5px" }}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
