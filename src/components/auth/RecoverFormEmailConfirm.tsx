import { CustomButton } from "../ui/CustomButton";
import type { LoginFormProps } from "../../interfaces/login";
import { type FC } from "react";
import { useAppState } from "../../hooks/useAppState";
import { CustomLink } from "../ui/CustomLink";

const RecoverFormEmailConfirm: FC<LoginFormProps> = () => {
  const {setModeLogin,authLoginForm, setModal, setMode, setAuthLoginForm, setMenuOpen} = useAppState();

  const handleClickSubmit=()=>{
    setModal(false)
    setMode('login');
    setAuthLoginForm({
      correo:"",
      contraseña:""
    });
    setModeLogin('login_one');
    setMenuOpen(false);
  }
  

  const handleClickAtras=():void =>{
    setModeLogin('recover_one');
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="!w-full flex flex-col gap-4">
        <h2 className="text-xl text-start font-bold text-gray-800">Te enviamos un correo a</h2>
        <p className="w-full text-gray-500 text-base leading-5 text-start font-bold">
          {authLoginForm?.correo}
        </p>
        <CustomButton
          type="submit"
          variant="primary"
          size="md"
          fontSize="14px"
          fontWeight={600}
          text="Continuar"
          fullWidth
          onClick={handleClickSubmit}
        />
        <div className="w-full flex items-center justify-center">
           <CustomLink
            text="No recibí el correo"
            variant="primary"
            onClick={handleClickAtras}
            fontSize="14px"
          />
        </div>
      </div>
    </div>
  );
};

export default RecoverFormEmailConfirm;
