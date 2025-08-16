import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CustomTable from "../../../ui/CustomTable";

const backgroundColor = "#F5FBF9"; // Mismo fondo que FilterAviso

const ProductoState = () => {
  const [open, setOpen] = useState(false);
  const loading = true;

  const headers = ["Tipo de Plan", "Plan", "Disponibles", "En uso"];

  return (
    <div
      className="rounded-2xl shadow-md border border-gray-200 transition-all duration-300"
      style={{ backgroundColor }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <ShoppingBasketIcon className="text-primary" />
          <span className="text-base sm:text-lg font-semibold text-gray-800">
            Mis productos disponibles:{" "}
            <span className="text-gray-500">cargando.</span>
          </span>
        </div>
        <div className="text-gray-600 hover:text-gray-800 transition-colors">
          {open ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>

      {/* Tabla */}
        {open && (
            <div className="px-4 pb-4">
                <div className="overflow-x-auto">
                <CustomTable
                    headers={headers}
                    rows={3}
                    columns={4}
                    loading={loading}
                />
                </div>
            </div>
        )}

    </div>
  );
};

export default ProductoState;
