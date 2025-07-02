import { useState, type FC } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

const CustomModal: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Abrir Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box p={4} bgcolor="white" mx="auto" my={10} maxWidth="400px" borderRadius={2}>
          <Typography variant="h6">Título del Modal</Typography>
          <Typography variant="body2">Contenido del modal aquí...</Typography>
          <Button onClick={() => setOpen(false)} sx={{ mt: 2 }}>Cerrar</Button>
        </Box>
      </Modal>
    </>
  );
};


export default CustomModal;