import React from 'react'
// import LoginForm from './LoginForm'
// import RegisterForm from './RegisterForm'
import CustomModal from '../ui/CustomModal'
import { useAppState } from '../../hooks/useAppState'
import CustomImage from '../ui/CustomImage';
import Logo from '../ui/CustomLogo';
import { CustomButton } from '../ui/CustomButton';
import { FaGoogle } from 'react-icons/fa';
import LoginFormEmail from './LoginFormEmail';
import RegisterForm from './RegisterForm';
import LoginFormPassword from './LoginFormPasswords';
import RegisterFormPassword from './RegisterFormPassword';
import type { ModeLoginType } from '../../interfaces/appStateInterface';
import type { LoginFormProps } from '../../interfaces/login';
import RecoverFormEmail from './RecoverFormEmail';
import RecoverFormEmailConfirm from './RecoverFormEmailConfirm';
import RecoverFormPassword from './RecoverFormPassword';

const AuthModal: React.FC = () => {

  const {modal, setModal, modeLogin, setAuthLoginForm, setModeLogin,setMode,mode} = useAppState();

  const openLogin = ():void => {
    setMode('login')
  }

  const openRegister = ():void => {
    setMode('register')
  }

  const handleClose = ():void => {
    setModal(false)
    setMode('login');
    setAuthLoginForm({
      correo:"",
      contraseña:""
    });
    setModeLogin('login_one');
  }

  const handleClickAuthGoogle=():void=>{

  }

  const componentsMap: Record<ModeLoginType, React.FC<LoginFormProps>> = {
    login_one: LoginFormEmail,
    login_two: LoginFormPassword,
    login_three: RegisterFormPassword,
    recover_one: RecoverFormEmail,
    recover_two: RecoverFormEmailConfirm,
    recover_three: RecoverFormPassword,
  };

  const SelectedLoginForm = componentsMap[modeLogin];

  return (
    <>
      <CustomModal isOpen={modal} onClose={handleClose} variant="auth">
        {/* Lado izquierdo */}
        <div className="relative h-screen w-full overflow-hidden hidden md:flex">
          <CustomImage
            name="auth_background"
            alt="auth background"
            className="absolute inset-0 w-full !h-screen object-cover z-0 md:scale-[2.5] lg:scale-[1.5] hidden md:flex"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 z-20 flex justify-center items-center  text-center w-full">
            <div className="px-10 lg:px-0 lg:max-w-[400px] flex flex-col gap-6 justify-center items-center">
              <Logo isActive={false} />
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-bold text-white">¡Bienvenido!</h2>
                <p className="text-white text-base leading-5">Ingresa a tu cuenta y accede fácilmente a los avisos que contactaste, tus favoritos, búsquedas guardadas y mucho más.</p>
                <CustomButton
                  type='button'
                  variant='warning-outline'
                  fullWidth={true}
                  fontSize='14px'
                  fontWeight={400}
                  text='Ingresa con Google'
                  onClick={handleClickAuthGoogle}
                  icon={<FaGoogle/>}
                  size='md'
                />  
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center text-center w-full h-full  overflow-y-auto">
          <div className=" w-full h-full p-5 md:px-10 max-w-[400px] md:max-w-full md:w-full lg:px-0 lg:max-w-[400px] flex flex-col gap-6 justify-center items-center ">
            <div className={`${mode === 'login' ? 'md:hidden' : 'hidden'} flex items-start justify-start w-full`}>
              <Logo isActive={true}/>
            </div>
            {mode === 'login' ? (
              <div className="w-full">
                <SelectedLoginForm switchToRegister={openRegister} />
              </div>
            ) : (
              <RegisterForm switchToLogin={openLogin} />
            )}
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export default AuthModal
