import { subCategoryVO } from "@/interfaces/gift.interface";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Subcategories = ({
  setSelectedSubCategory,
  subCategoriesOfSelectedCategory
}: {
  setSelectedSubCategory: React.Dispatch<number>;
  subCategoriesOfSelectedCategory: subCategoryVO[] | [];
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        my:
          subCategoriesOfSelectedCategory?.length > 0
            ? { xs: 2, sm: 2, md: 3, lg: 4 }
            : { xs: 1, sm: 1, md: 2, lg: 3 }
      }}
    >
      <Grid container spacing={2}>
        {subCategoriesOfSelectedCategory?.map((subCategory: subCategoryVO) => {
          const { id, categoryName } = subCategory;
          return (
            <Grid item key={id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  py: 1,
                  px: 2,
                  border: "1px solid lightGrey",
                  borderRadius: "14px",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#000",
                    color: "#fff"
                  }
                }}
                onClick={() => {
                  setSelectedSubCategory(id);
                  navigate(`/category/${id}`);
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: { xs: "12px", sm: "12px", md: "14px", lg: "16px" }
                  }}
                >
                  {categoryName}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Subcategories;
