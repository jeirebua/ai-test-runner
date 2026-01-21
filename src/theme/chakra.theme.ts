import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: '#FFE8DB' },
          100: { value: '#FFCFB8' },
          200: { value: '#FFB794' },
          300: { value: '#FF9E71' },
          400: { value: '#FF854D' },
          500: { value: '#FF6200' },
          600: { value: '#CC4E00' },
          700: { value: '#993B00' },
          800: { value: '#662700' },
          900: { value: '#331400' },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
