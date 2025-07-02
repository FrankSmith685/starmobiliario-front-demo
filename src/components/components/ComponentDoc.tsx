import { useState, type FC } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, useMediaQuery, useTheme, IconButton, Divider } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import type { ComponentDocProps } from "../../interfaces/DocumentComponent";


export const ComponentDoc: FC<ComponentDocProps> = ({ name, description, props = [], children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showAll, setShowAll] = useState(false);

  const displayedProps = showAll ? props : [];

  return (
    <Box>
     <Box display="flex" flexDirection={'row'} alignItems={'center'} justifyContent="space-between" gap={1} mb={2}>
      <Typography sx={{ fontSize: { xs: '17px', sm: '18px', md: '18px', lg: '19px' }, fontWeight: 600, color: 'primary.main' }}>{name}</Typography>
      <IconButton color="primary" sx={{ p: 0, ml: { sm: 1 }, alignSelf: 'center' }}><InfoIcon fontSize="medium" /></IconButton>
    </Box>


      <Typography sx={{ fontSize: { xs: '15px', sm: '16px', lg: '17px' } }} gutterBottom>{description}</Typography>
      <Box my={3}>{children}</Box>
      <Typography sx={{ fontSize: { xs: '16px', sm: '16px', lg: '17px' },fontWeight: 500}} gutterBottom>Propiedades</Typography>

      {displayedProps.length > 0 && (
        isMobile ? (
          <Box display="flex" flexDirection="column" gap={2}>
            {displayedProps.map((prop) => (
              <Box key={prop.name} sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <Typography sx={{ fontSize: { xs: '15px', sm: '16px', lg: '17px' } }} color="primary">{prop.name}</Typography>
                <Typography sx={{ fontSize: { xs: '15px', sm: '16px', lg: '17px' } }}>{prop.description}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption"><strong>Tipo:</strong> {prop.type || '-'}</Typography><br />
                <Typography variant="caption"><strong>Requerido:</strong> {prop.required ? 'Sí' : 'No'}</Typography><br />
                <Typography variant="caption"><strong>Valores:</strong> {prop.values ? prop.values.join(", ") : '-'}</Typography><br />
                <Typography variant="caption"><strong>Por defecto:</strong> {prop.defaultValue || '-'}</Typography><br />
                <Typography variant="caption"><strong>Ejemplo:</strong> {prop.example || '-'}</Typography><br />
                <Typography variant="caption"><strong>Notas:</strong> {prop.notes || '-'}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ minWidth: 120 }}>Propiedad</TableCell>
                  <TableCell sx={{ minWidth: 250 }}>Descripción</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Tipo</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Requerido</TableCell>
                  <TableCell sx={{ minWidth: 250 }}>Valores</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Por defecto</TableCell>
                  <TableCell sx={{ minWidth: 215 }}>Ejemplo</TableCell>
                  <TableCell sx={{ minWidth: 250 }}>Notas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedProps.map((prop) => (
                  <TableRow key={prop.name} hover>
                    <TableCell>{prop.name}</TableCell>
                    <TableCell>{prop.description}</TableCell>
                    <TableCell>{prop.type || '-'}</TableCell>
                    <TableCell>{prop.required ? 'Sí' : 'No'}</TableCell>
                    <TableCell>{prop.values ? prop.values.join(", ") : "-"}</TableCell>
                    <TableCell>{prop.defaultValue || '-'}</TableCell>
                    <TableCell>{prop.example || '-'}</TableCell>
                    <TableCell>{prop.notes || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}

      {props.length > 0 && (
        <Button variant="text" onClick={() => setShowAll(!showAll)} sx={{ mt: 2 }}>
          {showAll ? 'Ver menos' : 'Ver más'}
        </Button>
      )}
    </Box>
  );
};
