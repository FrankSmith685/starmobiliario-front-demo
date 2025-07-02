// src/components/ComponentSidebar.tsx
import {
  Box,
  Typography,
  List,
  ListItemButton,
} from "@mui/material";
import type { FC } from "react";

interface SidebarItem {
  id: string;
  label: string;
}

interface ComponentSidebarProps {
  items: SidebarItem[];
  onSelect: (id: string) => void;
}

const ComponentSidebar: FC<ComponentSidebarProps> = ({ items, onSelect }) => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        p: 2,
        borderRight: "1px solid #e0e0e0",
        bgcolor: "white",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        margin: 0
      }}
    >
      <Typography fontWeight="bold" fontSize="1.3rem" color="primary" mb={2}>
        Componentes
      </Typography>
      <List dense>
        {items.map(({ id, label }) => (
          <ListItemButton
            key={id}
            onClick={() => onSelect(id)}
            sx={{
              borderRadius: 2,
              my: 0.5,
              color: "#333",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
              },
            }}
          >
            {label}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ComponentSidebar;
