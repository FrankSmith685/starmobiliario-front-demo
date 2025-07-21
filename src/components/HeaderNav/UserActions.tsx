import { FaBell, FaRegCommentDots, FaSpinner } from 'react-icons/fa';
import { CustomButton } from '../ui/CustomButton';
import { Tooltip } from '@mui/material';
import type { UserActionsProps } from '../../interfaces/menuHeaderInterface';
import { useAppState } from '../../hooks/useAppState';
import { UserAvatarMenu } from './UserAvatarMenu';
import { useNotification } from '../../hooks/useNotificacionHooks/useNotification';

const UserActions = ({ menuOpen }: UserActionsProps) => {
  const { showMessage } = useNotification();
  const { setMode, setModal, user, loadingUser, setModeLogin } = useAppState();

  const handleClickIngresar = (): void => {
    setModal(true);
    setMode('login');
    setModeLogin('login_one');
  };

  const handleClickPublicar = (): void => {
    console.log('Publicar clickeado');
  };

  return (
    <div className='items-center gap-4 lg:gap-2 text-sm flex flex-row'>
      {/* Notificaciones */}
      <Tooltip
        title='Notificaciones'
        arrow
        className={`${menuOpen ? 'hidden' : ''}`}
        onClick={() => showMessage('¡Éxito total!', 'success')}
      >
        <div className='group rounded-full transition-all cursor-pointer hover:bg-primary hover:shadow-sm hover:scale-105'>
          <FaBell className='text-xl lg:text-lg transition-colors text-gray-700' />
        </div>
      </Tooltip>

      {/* Contactos */}
      <div
        className={`group hidden lg:flex items-center gap-1 p-3 rounded-md cursor-pointer transition-all hover:bg-primary hover:shadow-sm hover:scale-[1.02]`}
      >
        <FaRegCommentDots className='text-gray-700 text-lg transition-colors' />
        <span className='text-gray-700 transition-colors text-sm'>
          Mis contactos
        </span>
      </div>

      <Tooltip title='Mis contactos' arrow className={`${menuOpen ? 'hidden' : ''}`}>
        <div className='group lg:hidden rounded-full transition-all cursor-pointer hover:bg-primary hover:shadow-sm hover:scale-105'>
          <FaRegCommentDots className='text-gray-700 text-xl lg:text-lg transition-colors' />
        </div>
      </Tooltip>

      {/* Publicar */}
      <div className='hidden lg:flex'>
        <CustomButton
          type='button'
          variant='primary-outline'
          size='md'
          fontSize='14px'
          fontWeight={400}
          text='Publicar'
          onClick={handleClickPublicar}
        />
      </div>

      {/* Ingresar o Usuario */}
      {!user ? (
        <div className='hidden lg:flex'>
          {
            loadingUser ? (
              <div className="flex items-center justify-center px-3 py-2">
                <FaSpinner className="animate-spin text-primary text-xl" />
              </div>
            ):(
                <div className='hidden lg:flex'>
                  <CustomButton
                    type='button'
                    variant='primary'
                    size='md'
                    fontSize='14px'
                    fontWeight={400}
                    text='Ingresar'
                    onClick={handleClickIngresar}
                  />
                </div>
            )
          }
        </div>
      ) : (
        <div className='hidden lg:flex'>
          <UserAvatarMenu/>

        </div>
      )}
    </div>
  );
};

export default UserActions;
