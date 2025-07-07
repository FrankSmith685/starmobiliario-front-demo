import { FaBell, FaRegCommentDots } from "react-icons/fa";
import { CustomButton } from "../ui/CustomButton";
import { Tooltip } from "@mui/material";
import type { UserActionsProps } from "../../interfaces/menuHeaderInterface";

const UserActions = ({menuOpen}:UserActionsProps) => {
  const handleClickIngresar = (): void => {
    console.log("Ingresar clickeado");
  };

  const handleClickPublicar = (): void => {
    console.log("Publicar clickeado");
  };

  return (
    <div className="items-center gap-4 lg:gap-2 text-sm flex flex-row">
        <Tooltip title="Notificaciones" arrow className={`${menuOpen ? 'hidden' : ''}`}>
            <div className="group rounded-full transition-all cursor-pointer hover:bg-primary hover:shadow-sm hover:scale-105">
                <FaBell className=" text-xl lg:text-lg transition-colors  text-gray-700" />
            </div>
        </Tooltip>

        <div className={`group hidden lg:flex items-center gap-1 p-3 rounded-md cursor-pointer transition-all hover:bg-primary hover:shadow-sm hover:scale-[1.02]`}>
            <FaRegCommentDots className="text-gray-700 text-lg transition-colors  " />
            <span className="text-gray-700 transition-colors   text-sm">
                Mis contactos
            </span>
        </div>

        <Tooltip title="Mis contactos" arrow className={`${menuOpen ? 'hidden' : ''}`}>
            <div className="group lg:hidden rounded-full transition-all cursor-pointer hover:bg-primary hover:shadow-sm hover:scale-105">
                <FaRegCommentDots className="text-gray-700 text-xl lg:text-lg transition-colors  " />
            </div>
        </Tooltip>


      <div className="hidden lg:flex">
        <CustomButton
          type="button"
          variant="primary-outline"
          size="md"
          fontSize="14px"
          fontWeight={400}
          text="Publicar"
          onClick={handleClickPublicar}
        />
      </div>

      <div className="hidden lg:flex">
        <CustomButton
          type="button"
          variant="primary"
          size="md"
          fontSize="14px"
          fontWeight={400}
          text="Ingresar"
          onClick={handleClickIngresar}
        />
      </div>
    </div>
  );
};

export default UserActions;
