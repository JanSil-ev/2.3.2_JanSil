import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    brand: [
      '#e6f7ef',
      '#c2ebd9',
      '#9adfc1',
      '#6fd3a8',
      '#4dc890',
      '#3cb277',
      '#56B280',
      '#1e8a5a',
      '#0d6e44',
      '#00522e'
    ],
  },
  primaryColor: 'brand',
  primaryShade: 6,
  fontFamily: 'Inter, sans-serif', 
  
  components: {
    Button: {
      styles: {
        root: {
          borderRadius: '10px', 
          textTransform: 'uppercase', 
          transition: 'all 0.2s ease',
          
        },
      
      },
      

    },
    
  },
});