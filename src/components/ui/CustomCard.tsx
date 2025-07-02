// CustomCard.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface CustomCardProps {
  title: string;
  description: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;