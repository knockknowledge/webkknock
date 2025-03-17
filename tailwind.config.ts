import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',

        purpleTwitch: '#9146e0',
        pinkNeon: '#f22fb5',
        coralRed: '#ff5185',
        orangeSunset: '#ff8d5e',
        goldYellow: '#ffc650',
        lightLemon: '#f9f871',

        //purpleTwitch: '#9146e0',
        violetGlow: '#b062ff',
        lavenderDream: '#d07fff',
        softMagenta: '#f09cff',
        pastelPink: '#ffbaff',

        'primary-accent': 'var(--primary-accent)',
        'foreground-accent': 'var(--foreground-accent)',
        'hero-background': 'var(--hero-background)',
      },
    },
  },
  plugins: [],
};
export default config;
