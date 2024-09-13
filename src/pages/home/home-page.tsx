import { FC, useEffect, useState } from "react";
import { NestedMenuItem } from "mui-nested-menu";
import {
  getCategories,
  getGiftCardProductsByProgramCategory
} from "@/services/program.service";
import { theme } from "@/theme";
import sale from "../../assets/home/sale.png";
import Loader from "@/components/loader/loader";
import { useAppContext } from "@/context/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { Template1, Template2 } from "@/components/templates";
import DynamicTemplate from "@/components/templates/dynamic-template";
import { IGiftCard, subCategoryVO } from "@/interfaces/gift.interface";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { getComponentInstances, getTemplate } from "@/services/template.service";
import { IComponentInstance, ITemplateInstance } from "@/interfaces/template.interface";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMdlScreen = useMediaQuery(theme.breakpoints.down("mdl"));

  const {
    rootCategoryId,
    setRootCategoryId,
    programDetails,
    wishlistItems,
    selectedCategoryId,
    setSelectedCategoryId
  } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [giftCards, setGiftCards] = useState<IGiftCard[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<number>();
  const [categories, setCategories] = useState<subCategoryVO[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>();
  const [templateInstance, setTemplateInstance] = useState<ITemplateInstance>();
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: SVGSVGElement | null }>({});
  const [componentInstances, setComponentInstances] = useState<IComponentInstance[] | []>(
    []
  );

  const subCategoriesOfSelectedCategory = categories?.find(
    ({ id }) => id === selectedCategoryId
  )?.subCategoryVOs;

  const subCategoriesOfHoveredCategory = categories?.find(
    ({ id }) => id === hoveredCategory
  )?.subCategoryVOs;

  const handleDropIconClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ) => {
    if (anchorEl[id]) {
      setAnchorEl({ ...anchorEl, [id]: null });
    } else {
      setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
      setHoveredCategory(id);
    }
  };

  const handleClosePopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl({});
    event.stopPropagation();
  };

  const handleCategoryClick = (id: number): void => {
    setSelectedCategoryId(id);
    setSelectedSubCategory(0);
  };

  const getGiftCards = async () => {
    const category = categoryId || rootCategoryId;
    const response = await getGiftCardProductsByProgramCategory(category as number);
    setGiftCards(response || []);
  };

  const getCategoriesTree = async () => {
    if (!programDetails?.id) return;
    const response = await getCategories({
      programId: programDetails?.id,
      programCategoryCode: "ROOT"
    });
    setCategories(response?.subCategoryVOs);
    const rootCategoryId = response?.id;
    setRootCategoryId(rootCategoryId);
  };

  const getTemplateInstance = async (id: number) => {
    const programCategoryId = id;
    const response = await getTemplate(programCategoryId);
    setTemplateInstance(response);
  };

  const getComponentInstancesUsingTemplateInstanceId = async () => {
    const templateInstanceId = templateInstance?.id;
    if (!templateInstanceId) return;
    setLoading(true);
    const response = await getComponentInstances(templateInstanceId);
    setLoading(false);
    setComponentInstances(response || []);
  };

  useEffect(() => {
    getCategoriesTree();
  }, [programDetails?.id]);

  useEffect(() => {
    const id = categoryId || rootCategoryId;
    if (id) {
      getGiftCards();
      getTemplateInstance(Number(id));
    }
  }, [rootCategoryId, categoryId]);

  useEffect(() => {
    if (!selectedCategoryId && !selectedSubCategory && categories.length && categoryId) {
      let foundSubCategory: subCategoryVO | undefined;
      let foundCategory: subCategoryVO | null;

      categories?.forEach((category) => {
        foundCategory = category?.id === Number(categoryId) ? category : null;

        if (foundCategory) {
          setSelectedCategoryId(foundCategory?.id);
        } else {
          foundSubCategory = category?.subCategoryVOs?.find(
            (subCategory) => subCategory?.id === Number(categoryId)
          );
          if (foundSubCategory) {
            setSelectedCategoryId(foundSubCategory?.id);
            setSelectedSubCategory(foundSubCategory?.parentCategoryId);
          }
        }
      });
    }
  }, [categories, categoryId]);

  useEffect(() => {
    if (templateInstance?.id) {
      getComponentInstancesUsingTemplateInstanceId();
    }
  }, [templateInstance?.id]);

  const renderSubCategories = (subCategories: subCategoryVO[]) => {
    return subCategories.map(({ id, categoryName, subCategoryVOs }) => {
      if (subCategoryVOs && subCategoryVOs.length > 0) {
        return (
          <NestedMenuItem key={id} label={categoryName} parentMenuOpen={!!subCategoryVOs}>
            {renderSubCategories(subCategoryVOs)}
          </NestedMenuItem>
        );
      }
      return (
        <MenuItem
          key={id}
          onClick={(e) => {
            setSelectedSubCategory(id);
            setSelectedCategoryId(id);
            navigate(`/category/${id}`);
            setAnchorEl({});
            e.stopPropagation();
          }}
          sx={{ minWidth: "100px" }}
        >
          {categoryName}
        </MenuItem>
      );
    });
  };

  // Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* All Categories */}
      <Box sx={{ width: "100%", height: "1px", bgcolor: "#3464B3", opacity: 0.8 }}></Box>
      <Box
        sx={{
          bgColor: "#000",
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#000",
          color: "#fff",
          px: { xs: 2, sm: 3, md: 4, lg: 8 },
          py: 1
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: isSmScreen ? "12px" : "16px",
            fontWeight: "500",
            cursor: "pointer"
          }}
          onClick={() => {
            setSelectedCategoryId(rootCategoryId);
            navigate("/");
          }}
        >
          ALL CATEGORIES
        </Typography>

        {!isMdScreen && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {categories?.map(({ id, categoryName, subCategoryVOs }) => {
              // const categoryId = id;
              return (
                <Box
                  key={categoryName}
                  sx={{
                    display: "flex",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    handleCategoryClick(id);
                    navigate(`/category/${id}`);
                    e.stopPropagation();
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      borderBottom:
                        selectedCategoryId === id
                          ? "1px solid #3464B3"
                          : "1px solid transparent"
                    }}
                  >
                    {categoryName}
                  </Typography>

                  {subCategoryVOs?.length > 0 && (
                    <KeyboardArrowDownIcon
                      aria-controls={`menu-${id}`}
                      aria-haspopup="true"
                      onClick={(e) => {
                        handleDropIconClick(e, id);
                        e.stopPropagation();
                      }}
                      sx={{ cursor: "pointer" }}
                    />
                  )}

                  <Menu
                    id={`menu-${id}`}
                    anchorEl={anchorEl[id]}
                    open={Boolean(anchorEl[id] || false)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    sx={{ top: "10px" }}
                    onClose={handleClosePopover}
                  >
                    {/* {subCategoriesOfHoveredCategory?.map(
                      ({ id, categoryName, subCategoryVOs }) =>
                        subCategoryVOs ? (
                          <NestedMenuItem key={id} label={categoryName}>
                            {subCategoryVOs?.map(({ id, categoryName }) => (
                              
                            ))}
                          </NestedMenuItem>
                        ) : (
                          <MenuItem
                            key={id}
                            onClick={(e) => {
                              setSelectedSubCategory(id);
                              setSelectedCategoryId(categoryId);
                              navigate(`/category/${id}`);
                              setAnchorEl({});
                              e.stopPropagation();
                            }}
                          >
                            {categoryName}
                          </MenuItem>
                        )
                    )} */}
                    {renderSubCategories(subCategoriesOfHoveredCategory || [])}
                  </Menu>
                </Box>
              );
            })}
          </Box>
        )}

        {!isMdlScreen && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box style={{ width: "23px", height: "23px" }}>
              <img src={sale} alt="" style={{ width: "100%", height: "100%" }} />
            </Box>
            <Typography variant="body1"> Sale 20% Off On Your First Order.</Typography>
          </Box>
        )}
      </Box>
      {/* <Template1 */}
      {templateInstance?.templateId === 1 && (
        <Template1
          giftCards={giftCards}
          wishlistItems={wishlistItems}
          programId={programDetails?.id}
          componentInstances={componentInstances}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          subCategoriesOfSelectedCategory={subCategoriesOfSelectedCategory}
        />
      )}
      {/* Template2 */}
      {templateInstance?.templateId === 2 && (
        <Template2
          giftCards={giftCards}
          componentInstances={componentInstances}
          programId={programDetails?.id}
        />
      )}

      {/* Template3 */}
      {templateInstance?.templateId === 3 && (
        <DynamicTemplate
          giftCards={giftCards}
          componentInstances={componentInstances}
          subCategoriesOfSelectedCategory={
            selectedCategoryId === rootCategoryId
              ? categories
              : subCategoriesOfSelectedCategory || []
          }
          setSelectedSubCategory={setSelectedSubCategory}
        />
      )}
    </Box>
  );
};

export default HomePage;
