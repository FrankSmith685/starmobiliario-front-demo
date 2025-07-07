import React from 'react'
import { Dialog, IconButton, Slide } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { type TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

type FullScreenModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  isOpen,
  onClose,
  children,
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
        aria-label='close'
        onClick={onClose}
        sx={() => ({
          position: 'absolute',
          right: 15,
          top: 8,
        })}
      >
        <CloseIcon fontSize='small' />
      </IconButton>

      <main className='flex justify-center items-start overflow-auto min-h-screen py-8'>
        <div className='max-w-[400px] w-full flex flex-col gap-5 p-6'>
          {children}
        </div>
      </main>
    </Dialog>
  )
}

export default FullScreenModal
