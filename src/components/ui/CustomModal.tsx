import React from 'react'
import { Dialog, IconButton, Slide } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { type TransitionProps } from '@mui/material/transitions'
import clsx from 'clsx'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type FullScreenModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  variant?: 'default' | 'auth'
  mainClassName?: string
  containerClassName?: string
}

const CustomModal: React.FC<FullScreenModalProps> = ({
  isOpen,
  onClose,
  children,
  variant = 'default',
  mainClassName = '',
  containerClassName = '',
}) => {
  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      slots={{
        transition: Transition,
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 15,
          top: 8,
          zIndex: 50,
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {variant === 'auth' ? (
        <main
          className={clsx(
            'grid grid-cols-1 md:grid-cols-2 h-screen overflow-auto',
            mainClassName
          )}
        >
          {children}
        </main>
      ) : (
        <main
          className={clsx(
            'flex justify-center items-start overflow-auto min-h-screen py-8',
            mainClassName
          )}
        >
          <div
            className={clsx(
              'max-w-[400px] w-full flex flex-col gap-5 p-6',
              containerClassName
            )}
          >
            {children}
          </div>
        </main>
      )}
    </Dialog>
  )
}

export default CustomModal
