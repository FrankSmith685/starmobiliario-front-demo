import { Tab, Tabs } from '@mui/material'
import type {
  CustomTabsProps,
  Variant,
  VariantStyle,
} from '../../interfaces/DocumentComponent'

const colors: Record<Variant, VariantStyle> = {
  primary: { background: '#fff', color: '#0A4C3D' },
  secondary: { background: '#fff', color: '#C75C2D' },
  terciary: { background: '#fff', color: '#2A3D66' },
  warning: { background: '#fff', color: '#C62828' },
}

export const CustomTabs: React.FC<CustomTabsProps> = ({
  value,
  onChange,
  labels,
  className,
  tabClassName,
  isMobile = false,
  variant = 'secondary',
}) => {
  const palette = colors[variant]

  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant={isMobile ? 'fullWidth' : 'standard'}
      className={className}
      sx={{
        backgroundColor: palette.background,
        borderRadius: '10px 10px 0 0',
        px: 2,
        py: 1,
      }}
      slotProps={{
        indicator: {
          style: {
            backgroundColor: palette.color,
            height: '3px',
            borderRadius: '2px',
          },
        },
      }}
    >
      {labels.map((label, index) => (
        <Tab
          key={index}
          label={label}
          className={tabClassName}
          sx={{
            borderRadius: '6px 6px 0 0',
            textTransform: 'none',
            fontWeight: value === index ? 600 : 400,
            color: '#666',
            transition: 'all 0.3s',
            '&.Mui-selected': {
              color: palette.color, 
            },
          }}
        />
      ))}
    </Tabs>
  )
}
