/* eslint-disable @typescript-eslint/no-require-imports */
// import type { Config } from 'tailwindcss';

// const config = {
//   darkMode: ['class'],
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       container: {
//         center: true,
//         padding: '2rem',
//         screens: {
//           '2xl': '1400px',
//         },
//       },
//       colors: {
//         border: 'hsl(var(--border))',
//         input: 'hsl(var(--input))',
//         ring: 'hsl(var(--ring))',
//         background: 'hsl(var(--background))',
//         foreground: 'hsl(var(--foreground))',
//         destructive: {
//           DEFAULT: 'hsl(var(--destructive))',
//           foreground: 'hsl(var(--destructive-foreground))',
//         },
//         muted: {
//           DEFAULT: 'hsl(var(--muted))',
//           foreground: 'hsl(var(--muted-foreground))',
//         },
//         accent: {
//           DEFAULT: 'hsl(var(--accent))',
//           foreground: 'hsl(var(--accent-foreground))',
//         },
//         popover: {
//           DEFAULT: 'hsl(var(--popover))',
//           foreground: 'hsl(var(--popover-foreground))',
//         },
//         card: {
//           DEFAULT: 'hsl(var(--card))',
//           foreground: 'hsl(var(--card-foreground))',
//         },
//         sidebar: {
//           DEFAULT: 'hsl(var(--sidebar-background))',
//           foreground: 'hsl(var(--sidebar-foreground))',
//           primary: 'hsl(var(--sidebar-primary))',
//           'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
//           accent: 'hsl(var(--sidebar-accent))',
//           'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
//           border: 'hsl(var(--sidebar-border))',
//           ring: 'hsl(var(--sidebar-ring))',
//         },
//         customgreys: {
//           primarybg: '#1B1C22',
//           secondarybg: '#25262F',
//           darkGrey: '#17181D',
//           darkerGrey: '#3d3d3d',
//           dirtyGrey: '#6e6e6e',
//         },
//         primary: {
//           '50': '#fdfdff',
//           '100': '#f7f7ff',
//           '200': '#ececff',
//           '300': '#ddddfe',
//           '400': '#cacafe',
//           '500': '#b3b3fd',
//           '600': '#9898fd',
//           '700': '#7878fc',
//           '750': '#5a5be6',
//           '800': '#0404be',
//           '900': '#020255',
//           '950': '#010132',
//           DEFAULT: 'hsl(var(--primary))',
//           foreground: 'hsl(var(--primary-foreground))',
//         },
//         secondary: {
//           '50': '#fcfefe',
//           '100': '#f3fbfa',
//           '200': '#e5f7f4',
//           '300': '#d0f1ec',
//           '400': '#b6e9e1',
//           '500': '#96dfd4',
//           '600': '#70d3c4',
//           '700': '#44c5b2',
//           '800': '#227064',
//           '900': '#123933',
//           '950': '#0c2723',
//           DEFAULT: 'hsl(var(--secondary))',
//           foreground: 'hsl(var(--secondary-foreground))',
//         },
//         white: {
//           '50': '#d2d2d2',
//           '100': '#ffffff',
//         },
//         tertiary: {
//           '50': '#E9B306',
//         },
//         chart: {
//           '1': 'hsl(var(--chart-1))',
//           '2': 'hsl(var(--chart-2))',
//           '3': 'hsl(var(--chart-3))',
//           '4': 'hsl(var(--chart-4))',
//           '5': 'hsl(var(--chart-5))',
//         },
//       },
//       borderRadius: {
//         lg: 'var(--radius)',
//         md: 'calc(var(--radius) - 2px)',
//         sm: 'calc(var(--radius) - 4px)',
//       },
//       keyframes: {
//         'accordion-down': {
//           from: {
//             height: '0',
//           },
//           to: {
//             height: 'var(--radix-accordion-content-height)',
//           },
//         },
//         'accordion-up': {
//           from: {
//             height: 'var(--radix-accordion-content-height)',
//           },
//           to: {
//             height: '0',
//           },
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//       },
//       fontFamily: {
//         sans: ['var(--font-dm-sans)'],
//       },
//       fontSize: {
//         xs: ['0.75rem', { lineHeight: '1rem' }],
//         sm: ['0.875rem', { lineHeight: '1.25rem' }],
//         md: ['1rem', { lineHeight: '1.5rem' }],
//         lg: ['1.125rem', { lineHeight: '1.75rem' }],
//         xl: ['1.25rem', { lineHeight: '1.75rem' }],
//         '2xl': ['1.5rem', { lineHeight: '2rem' }],
//       },
//     },
//   },
//   // eslint-disable-next-line @typescript-eslint/no-require-imports
//   plugins: [require('tailwindcss-animate'), 'prettier-plugin-tailwindcss'],
// } satisfies Config;

// export default config;

// import type { Config } from 'tailwindcss';

// const config = {
//   darkMode: ['class'],
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       container: {
//         center: true,
//         padding: '2rem',
//         screens: {
//           '2xl': '1400px',
//         },
//       },
//       colors: {
//         border: 'hsl(var(--border))',
//         input: 'hsl(var(--input))',
//         ring: 'hsl(var(--ring))',
//         background: '#F7F9FC', // Off White
//         foreground: '#2D2D2D', // Charcoal Grey
//         destructive: {
//           DEFAULT: '#FFCDD2', // Soft Red
//           foreground: '#C62828', // Crimson
//         },
//         muted: {
//           DEFAULT: '#ECEFF1', // Cool Grey
//           foreground: '#607D8B', // Medium Grey
//         },
//         accent: {
//           DEFAULT: '#FFE0B2', // Soft Peach
//           foreground: '#EF6C00', // Rich Orange
//         },
//         popover: {
//           DEFAULT: '#FFFFFF', // White
//           foreground: '#37474F', // Cool Grey
//         },
//         card: {
//           DEFAULT: '#FFFFFF', // White
//           foreground: '#37474F', // Cool Grey
//         },
//         sidebar: {
//           DEFAULT: '#FFFFFF', // White
//           foreground: '#37474F', // Cool Grey
//           primary: '#81D4FA', // Light Blue
//           'primary-foreground': '#01579B', // Deep Blue
//           accent: '#81D4FA', // Light Blue
//           'accent-foreground': '#01579B', // Deep Blue
//           border: '#CFD8DC', // Light Grey
//           ring: '#CFD8DC', // Light Grey
//         },
//         customgreys: {
//           primarybg: '#F7F9FC', // Background Off White
//           secondarybg: '#ECEFF1', // Cool Grey
//           darkGrey: '#607D8B', // Medium Grey
//           darkerGrey: '#37474F', // Cool Grey Foreground
//           dirtyGrey: '#CFD8DC', // Light Grey
//         },
//         primary: {
//           '50': '#fdfdff',
//           '100': '#f7f7ff',
//           '200': '#ececff',
//           '300': '#ddddfe',
//           '400': '#cacafe',
//           '500': '#b3b3fd',
//           '600': '#9898fd',
//           '700': '#7878fc',
//           '750': '#5a5be6',
//           '800': '#0404be',
//           '900': '#020255',
//           '950': '#010132',
//           DEFAULT: '#B3E5FC', // Light Sky Blue
//           foreground: '#01579B', // Deep Blue
//         },
//         secondary: {
//           '50': '#fcfefe',
//           '100': '#f3fbfa',
//           '200': '#e5f7f4',
//           '300': '#d0f1ec',
//           '400': '#b6e9e1',
//           '500': '#96dfd4',
//           '600': '#70d3c4',
//           '700': '#44c5b2',
//           '800': '#227064',
//           '900': '#123933',
//           '950': '#0c2723',
//           DEFAULT: '#D0F8CE', // Light Mint Green
//           foreground: '#2E7D32', // Deep Green
//         },
//         white: {
//           '50': '#d2d2d2',
//           '100': '#ffffff',
//         },
//         tertiary: {
//           '50': '#E9B306', // Gold Accent
//         },
//         chart: {
//           '1': 'hsl(var(--chart-1))',
//           '2': 'hsl(var(--chart-2))',
//           '3': 'hsl(var(--chart-3))',
//           '4': 'hsl(var(--chart-4))',
//           '5': 'hsl(var(--chart-5))',
//         },
//       },
//       borderRadius: {
//         lg: 'var(--radius)',
//         md: 'calc(var(--radius) - 2px)',
//         sm: 'calc(var(--radius) - 4px)',
//       },
//       keyframes: {
//         'accordion-down': {
//           from: {
//             height: '0',
//           },
//           to: {
//             height: 'var(--radix-accordion-content-height)',
//           },
//         },
//         'accordion-up': {
//           from: {
//             height: 'var(--radix-accordion-content-height)',
//           },
//           to: {
//             height: '0',
//           },
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//       },
//       fontFamily: {
//         sans: ['var(--font-dm-sans)'],
//       },
//       fontSize: {
//         xs: ['0.75rem', { lineHeight: '1rem' }],
//         sm: ['0.875rem', { lineHeight: '1.25rem' }],
//         md: ['1rem', { lineHeight: '1.5rem' }],
//         lg: ['1.125rem', { lineHeight: '1.75rem' }],
//         xl: ['1.25rem', { lineHeight: '1.75rem' }],
//         '2xl': ['1.5rem', { lineHeight: '2rem' }],
//       },
//     },
//   },
//   // eslint-disable-next-line @typescript-eslint/no-require-imports
//   plugins: [require('tailwindcss-animate'), 'prettier-plugin-tailwindcss'],
// } satisfies Config;

// export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        white: {
          '50': '#d2d2d2',
          '100': '#ffffff',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Primary color
          600: '#EA580C',
          700: '#C2410C',
          750: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#7C2D12',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#FDF2F2',
          100: '#FDE8E8',
          200: '#FBD5D5',
          300: '#F8B4B4',
          400: '#F98080',
          500: '#F05252', // Secondary color
          600: '#E02424',
          700: '#C81E1E',
          800: '#9B1C1C',
          900: '#771D1D',
          950: '#771D1D',
        },
        success: {
          // Add default success color
          DEFAULT: '#34D399',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },

        'cod-gray': {
          DEFAULT: '#171616',
          50: '#757070',
          100: '#6A6666',
          200: '#565252',
          300: '#413E3E',
          400: '#2C2A2A',
          500: '#171616',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },

        customgreys: {
          primarybg: '#F7F9FC', // Background Off White
          secondarybg: '#ECEFF1', // Cool Grey
          darkGrey: '#607D8B', // Medium Grey
          darkerGrey: '#37474F', // Cool Grey Foreground
          dirtyGrey: '#CFD8DC', // Light Grey
        },
        sidebar: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          primary: 'hsl(var(--primary))',
          'primary-foreground': 'hsl(var(--primary-foreground))',
          accent: 'hsl(var(--accent))',
          'accent-foreground': 'hsl(var(--accent-foreground))',
          border: 'hsl(var(--border))',
          ring: 'hsl(var(--ring))',
        },
        tertiary: {
          '50': '#E9B306', // Gold Accent
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        md: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [
    require('tailwindcss-animate'),
    'prettier-plugin-tailwindcss',
    require('tailwind-scrollbar'),
  ],
};

export default config;
