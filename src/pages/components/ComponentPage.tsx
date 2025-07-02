import { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ComponentDoc } from "../../components/components/ComponentDoc";
import DocumentButton from "./DocumentComponents/DocumentButton";
import DocumentInput from "./DocumentComponents/DocumentInput";
import DocumentSelect from "./DocumentComponents/DocumentSelected";
import DocumentCheckbox from "./DocumentComponents/DocumentCheckbox";
import DocumentSwitch from "./DocumentComponents/DocumentSwitch";
import { Element, scroller } from "react-scroll";
import ComponentSidebar from "../../components/components/ComponentSidebar";

const components = [
  { id: "button", label: "Botón", component: DocumentButton },
  { id: "input", label: "Input", component: DocumentInput },
  { id: "select", label: "Select", component: DocumentSelect },
  { id: "checkbox", label: "Checkbox", component: DocumentCheckbox },
  { id: "switch", label: "Switch", component: DocumentSwitch },
];

const ComponentPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    scroller.scrollTo(id, {
      duration: 500,
      smooth: true,
      offset: -80,
    });
    if (isMobile) setMenuOpen(false);
  };

  return (
    <Box sx={{ display: "flex"}}>
      {!isMobile && (
        <ComponentSidebar items={components} onSelect={scrollTo} />
      )}

      <div className="responsive-padding">
        <Box sx={{ flex: 1 }}>
          <Stack spacing={6}>
            <Box
              textAlign={{ xs: "left", md: "center" }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: { xs: "sticky", md: "static" },
                top: { xs: 0, md: "auto" },
                zIndex: 100,
                bgcolor: "white",
                py: 2,
                borderBottom: { xs: "1px solid #eee", md: "none" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: "bold",
                }}
                color="primary"
                gutterBottom
              >
                Catálogo de Componentes
              </Typography>

              {isMobile && (
                <IconButton onClick={() => setMenuOpen(true)} color="primary">
                  <MenuIcon />
                </IconButton>
              )}
            </Box>


            {components.map(({ id, label, component: Component }) => (
              <Element key={id} name={id}>
                <Box>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    {label}
                  </Typography>
                  <Component ComponentDoc={ComponentDoc} />
                  <Divider sx={{ my: 4 }} />
                </Box>
              </Element>
            ))}
          </Stack>
        </Box>
      </div>

      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <ComponentSidebar items={components} onSelect={scrollTo} />
      </Drawer>
    </Box>
  );
};

export default ComponentPage;
