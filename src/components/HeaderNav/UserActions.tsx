import { FaBell, FaRegCommentDots } from "react-icons/fa";
import { CustomButton } from "../ui/CustomButton";
import { Tooltip } from "@mui/material";

const UserActions = () => {
  const handleClickIngresar = (): void => {
    console.log("Ingresar clickeado");
  };

  return (
    <div className="items-center gap-2 text-sm flex flex-row">

        <Tooltip title="Notificaciones" arrow>
            <div className="group p-2 rounded-full transition-all cursor-pointer hover:bg-violet-100 hover:shadow-sm hover:scale-105">
                <FaBell className="text-gray-700 text-lg transition-colors group-hover:text-violet-900" />
            </div>
        </Tooltip>

        <div className="group hidden lg:flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all hover:bg-violet-100 hover:shadow-sm hover:scale-[1.02]">
            <FaRegCommentDots className="text-gray-700 text-lg transition-colors group-hover:text-violet-900" />
            <span className="text-gray-700 transition-colors group-hover:text-violet-900">
            Mis contactos
            </span>
        </div>
        
        <Tooltip title="Mis contactos" arrow>
            <div className="group lg:hidden p-2 rounded-full transition-all cursor-pointer hover:bg-violet-100 hover:shadow-sm hover:scale-105">
                <FaRegCommentDots className="text-gray-700 text-lg transition-colors group-hover:text-violet-900" />
            </div>
        </Tooltip>

        <div className="group hidden lg:flex px-3 py-2 rounded-md text-gray-700 cursor-pointer transition-all hover:bg-violet-100 hover:shadow-sm hover:scale-[1.02] group-hover:text-violet-900">
            <span className="transition-colors group-hover:text-violet-900">
            Publicar
            </span>
        </div>
        {/* <div className="hidden lg:flex">
            <CustomButton
                type="button"
                variant="primary-outline"
                size="md"
                fontSize="14px"
                fontWeight={400}
                text="Ingresar"
                onClick={handleClickIngresar}
            />
        </div> */}

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
