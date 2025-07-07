import { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Stack,
  IconButton,
  Link,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import FullScreenModal from './FullScreenModal'
import { CustomInput } from '../ui/CustomInput'
import { CustomButton } from '../ui/CustomButton'
import { CustomSelect } from '../ui/CustomSelected'
import { CustomCheckbox } from '../ui/CustomCheckbox'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface AuthModalProps {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isRegistering, setIsRegistering] = useState(false)

  const handleModalClose = () => onClose(false)

  return (
    <FullScreenModal isOpen={isOpen} onClose={handleModalClose}>
      <Box>
        <IconButton className='mb-4'>
          <ArrowBackIcon />
          <Typography ml={1}>Atrás</Typography>
        </IconButton>

        <Typography variant='h6' fontWeight={700} lineHeight={1.1}>
          {isRegistering
            ? 'Ingresa los datos para crear tu perfil profesional'
            : '¡Hola!'}
        </Typography>

        {!isRegistering && (
          <Typography variant='body2'>
            Ingresa a tu cuenta y accede a los avisos que contactaste, tus
            favoritos, las búsquedas guardadas ¡y más!
          </Typography>
        )}
      </Box>

      <form className='flex flex-col gap-4 overflow-y-auto'>
        {isRegistering ? (
          <>
            <div className='flex flex-col gap-3'>
              <CustomSelect
                value=''
                onChange={() => {}}
                label='Tipo de usuario'
                fullWidth
                fontSize='12px'
                size='md'
                options={[
                  { value: 'inmobiliaria', label: 'Inmobiliaria' },
                  { value: 'particular', label: 'Particular' },
                  { value: 'constructora', label: 'Constructora' },
                  { value: 'agente', label: 'Agente' },
                ]}
              />

              <CustomInput
                value=''
                onChange={() => {}}
                label='Email'
                type='email'
                placeholder='Ingrese su correo electrónico'
                fullWidth
                size='md'
                fontSize='12px'
              />

              <CustomInput
                value=''
                onChange={() => {}}
                fullWidth
                type='password'
                placeholder='Contraseña'
                size='md'
                label='Contraseña'
                fontSize='12px'
              />
            </div>

            <div className='flex flex-col gap-3'>
              <Typography variant='body2' fontWeight={600}>
                Datos
              </Typography>

              <CustomInput
                value=''
                onChange={() => {}}
                label='Nombre'
                fullWidth
                placeholder='Ingrese su nombre'
                size='md'
                fontSize='12px'
              />

              <CustomInput
                value=''
                onChange={() => {}}
                label='Razon social'
                placeholder='Ingrese su razón social'
                fullWidth
                size='md'
                fontSize='12px'
              />
            </div>

            <div className='flex flex-col gap-3'>
              <Typography variant='body2' fontWeight={600}>
                Condición fiscal
              </Typography>

              <CustomInput
                value=''
                onChange={() => {}}
                label='RUC'
                placeholder='RUC'
                fullWidth
                size='md'
                fontSize='12px'
              />

              <CustomInput
                value=''
                onChange={() => {}}
                label='Teléfono'
                placeholder='Ingrese su teléfono'
                fullWidth
                size='md'
                fontSize='12px'
              />

              <CustomInput
                value=''
                onChange={() => {}}
                label='Teléfono móvil'
                placeholder='Ingrese su teléfono móvil'
                fullWidth
                size='md'
                fontSize='12px'
              />
            </div>

            <CustomCheckbox
              label='Acepto los términos y condiciones'
              checked={false}
              onChange={() => {}}
              size='md'
              fontSize='12px'
              variant='primary'
            />

            <CustomCheckbox
              label='Autorizo el uso de mi información para fines adicionales'
              checked={false}
              onChange={() => {}}
              size='md'
              fontSize='12px'
              variant='primary'
            />
          </>
        ) : (
          <CustomInput
            value=''
            onChange={() => {}}
            label='Correo electrónico'
            type='email'
            fullWidth
            required
            placeholder='Ingrese su correo electrónico'
            size='md'
          />
        )}

        <CustomButton
          type='submit'
          variant='primary'
          size='md'
          fontSize='14px'
          fontWeight={600}
          text={isRegistering ? 'Registrarse' : 'Continuar'}
          fullWidth
          onClick={() => {
            console.log('Form submitted')
            setIsRegistering(false)
            handleModalClose()
          }}
        />
      </form>

      {!isRegistering && (
        <>
          <Box display='flex' alignItems='center' gap={1}>
            <Divider sx={{ flex: 1 }} />

            <Typography variant='body2' color='textSecondary'>
              o ingresa con
            </Typography>

            <Divider sx={{ flex: 1 }} />
          </Box>

          <Stack direction='row' spacing={2} justifyContent='center'>
            <IconButton>
              <GoogleIcon />
            </IconButton>
          </Stack>

          <Box bgcolor='#f6f6f6' borderRadius={2} textAlign='center' p={2}>
            <Typography variant='body2' fontSize={14} fontWeight={500}>
              ¿Eres un profesional inmobiliario y no tienes cuenta?
            </Typography>

            <Link
              component={'button'}
              sx={{ color: '#000000', fontSize: '14px', fontWeight: 600 }}
              onClick={() => setIsRegistering(true)}
            >
              Regístrate acá
            </Link>
          </Box>
        </>
      )}
    </FullScreenModal>
  )
}

export default AuthModal
