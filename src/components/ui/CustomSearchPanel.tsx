import React, { useEffect, useState } from 'react'
import {
  Tabs,
  Tab,
  Box,
  type SelectChangeEvent,
  Typography,
} from '@mui/material'
import { CustomButton } from './CustomButton'
import { CustomSelected } from './CustomSelected'
import { CustomInput } from './CustomInput'

const BANNERS_IMG = [
  '/images/banners/banner1.jpg',
  '/images/banners/banner2.jpg',
  '/images/banners/banner3.jpg',
]

const OPTIONS_SEARCH = [
  { value: 'department', label: 'Departamento' },
  { value: 'house', label: 'Casa' },
  { value: 'land', label: 'Terreno / Lote' },
  { value: 'room', label: 'Habitación' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'garage', label: 'Cochera' },
  { value: 'office', label: 'Oficina' },
  { value: 'all', label: 'Todos' },
]

const operationLabels = ['Alquilar', 'Comprar', 'Proyectos'] as const
type OperationType = (typeof operationLabels)[number]

const CustomSearchPanel: React.FC = () => {
  const [tab, setTab] = useState<number>(0)
  const [propertyType, setPropertyType] = useState<string>('department')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleTabChange = (_: React.SyntheticEvent, newValue: number): void => {
    setTab(newValue)
  }

  const handlePropertyTypeChange = (event: SelectChangeEvent<string | number>): void => {
    setPropertyType(event.target.value as string)
  }

  const handleSearch = (): void => {
    const selectedOperation: OperationType = operationLabels[tab]
    console.log({
      operation: selectedOperation,
      propertyType,
      searchTerm,
    })
  }

  const backgroundImage = BANNERS_IMG[tab]

  return (
    <div
      className='relative bg-cover bg-center pt-10 pb-60 bg-no-repeat px-4 transition-all duration-500 ease-in-out'
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component='h2'
        fontWeight={800}
        className='text-center text-white'
      >
        Encuentra tu hogar
      </Typography>

      <section className={`max-w-5xl mx-auto ${isMobile ? 'mt-6' : 'mt-12'}`}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          variant={`${isMobile ? 'fullWidth' : 'standard'}`}
          className='bg-white md:w-fit rounded-t-xl px-4 py-2'
        >
          {operationLabels.map((label, index) => (
            <Tab key={index} label={label} className={`${tab === index ? 'bg-gray-200' : ''}`} />
          ))}
        </Tabs>

        <div className='bg-white p-4 rounded-b-xl md:rounded-tr-xl shadow-md max-w-5xl'>
          <div className='flex flex-col md:flex-row gap-3 items-center'>
            <CustomSelected 
              value={propertyType}
              onChange={handlePropertyTypeChange}
              options={OPTIONS_SEARCH}
              label='Tipo de propiedad'
              variant='primary'
              fullWidth={isMobile}
            />
  
            <Box className='flex-1 w-full'>
              <CustomInput 
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                placeholder='Buscar por ubicación, características...'
                fullWidth
              />
            </Box>

            <CustomButton
              onClick={handleSearch}
              text='Buscar'
              ariaLabel='Buscar propiedades'
              fullWidth={isMobile}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomSearchPanel
