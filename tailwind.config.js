export default {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/primeng/**/*.{js,ts}',
    './node_modules/@aredegalli/**/*.{html,js,ts}',
  ],
  safelist: [
    // === SAFELIST PER @aredegalli/ng-auth ===

    // Layout base
    'min-h-screen',
    'flex',
    'items-center',
    'justify-center',
    'p-4',
    'relative',
    'overflow-hidden',
    'w-full',
    'max-w-md',
    'z-10',
    'space-y-6',
    'space-y-2',
    'space-y-1',
    'w-96',
    'h-96',
    'h-1',
    'h-px',
    'absolute',
    'inset-0',
    'inline-flex',
    'block',

    // Positioning
    'top-0',
    'left-0',
    'right-0',
    'bottom-0',
    'top-1/2',
    'left-1/2',
    'right-3',
    '-bottom-1',
    '-translate-x-1/2',
    '-translate-y-1/2',
    '-translate-y-0.5',
    '-translate-y-px',

    // Backgrounds e gradienti
    'bg-gradient-to-br',
    'bg-gradient-to-r',
    'from-indigo-950',
    'via-purple-950',
    'to-pink-950',
    'from-purple-600',
    'to-pink-600',
    'from-purple-700',
    'to-pink-700',
    'from-purple-500',
    'to-pink-600',
    'from-purple-500/20',
    'via-pink-500/20',
    'to-indigo-500/20',
    'from-transparent',
    'via-purple-500/50',
    'to-transparent',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-white',
    'bg-white/10',
    'bg-white/15',
    'bg-white/20',
    'bg-transparent',
    'backdrop-blur-2xl',
    'backdrop-blur-xl',

    // Bordi e ombre
    'rounded-3xl',
    'rounded-lg',
    'rounded-full',
    'shadow-2xl',
    'shadow-lg',
    'shadow-purple-500/20',
    'shadow-purple-500/25',
    'border',
    'border-0',
    'border-t',
    'border-white/10',
    'border-white/20',
    'border-red-400/50',
    'border-purple-400/50',

    // Filtri e effetti
    'filter',
    'blur-[128px]',
    'opacity-10',
    'opacity-20',
    'opacity-30',
    'opacity-50',
    'opacity-60',

    // Animazioni (le nostre custom + quelle esistenti)
    'animate-float',
    'animate-gradient-xy',
    'animate-slideDown',
    'animate-shake',
    'animate-pulse',
    'animate-spin',
    'animate-float-slow',
    'animate-float-slower',
    'animate-pulse-slow',
    'animate-pulse-subtle',
    'animate-spin-slow',
    'animate-gradient-x',
    'animate-energy-line-1',
    'animate-energy-line-2',
    'animate-energy-line-3',
    'animate-energy-line-4',
    'animate-bounce-dot-1',
    'animate-bounce-dot-2',
    'animate-bounce-dot-3',
    'animate-float-icon-1',
    'animate-float-icon-2',
    'animate-float-icon-3',

    // Colori di testo
    'text-white',
    'text-white/60',
    'text-white/80',
    'text-white/40',
    'text-red-400',
    'text-purple-400',
    'text-purple-300',
    'text-3xl',
    'text-sm',
    'text-xs',
    'font-bold',
    'font-medium',
    'font-semibold',

    // Spacing
    'mb-8',
    'mb-6',
    'mb-4',
    'mb-2',
    'mt-8',
    'mt-2',
    'mt-1',
    'ml-2',
    'mr-2',
    'my-8',
    'px-2',
    'px-4',
    'px-8',
    'py-2',
    'py-3',
    'p-8',
    'pl-2',
    'pl-8',
    'pl-10',
    'pr-12',

    // Grid & Flex
    'flex-row',
    'gap-1',
    'gap-2',
    'gap-4',
    'justify-between',
    'justify-center',
    'basis-2/7',

    // Dimensioni
    'w-10',
    'w-20',
    'h-10',
    'h-20',
    'text-[10px]',

    // States e hover
    'hover:bg-white/15',
    'hover:bg-white/20',
    'hover:text-white/60',
    'hover:text-white/80',
    'hover:text-purple-300',
    'hover:border-purple-400/50',
    'hover:shadow-lg',
    'hover:shadow-purple-500/25',
    'hover:-translate-y-0.5',
    'hover:from-purple-700',
    'hover:to-pink-700',
    'focus:bg-white/15',
    'focus:border-purple-400/50',
    'focus:shadow-[0_0_0_0.2rem_rgba(168,85,247,0.2)]',
    'focus:outline-none',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:hover:translate-y-0',
    'group',
    'group-hover:text-white/80',

    // Utility classes specifiche
    'text-center',
    'cursor-pointer',
    'pointer-events-none',
    'transition-all',
    'transition-colors',
    'duration-200',
    'duration-300',
    'ease-out',
    'ease-in-out',
    'scale-0.98',
    'outline-none',

    // Classes per gli errori
    '!border-red-400/50',
    '!pl-8',
    '!bg-white/10',
    '!border-white/20',
    '!text-white',
    'placeholder:!text-white/40',
    '!pr-12',
    'focus:!bg-white/15',
    'focus:!border-purple-400/50',
    'focus:!shadow-[0_0_0_0.2rem_rgba(168,85,247,0.2)]',
    'hover:!bg-white/15',

    // Classes per i bottoni PrimeNG
    '!flex',
    '!flex-row',
    '!gap-4',
    '!bg-gradient-to-r',
    '!from-purple-600',
    '!to-pink-600',
    '!border-0',
    '!py-3',
    'hover:!from-purple-700',
    'hover:!to-pink-700',
    '!transition-all',
    '!duration-300',
    'hover:!shadow-lg',
    'hover:!shadow-purple-500/25',
    'hover:!-translate-y-0.5',
    '!border-white/20',
    '!text-white/80',
    'hover:!bg-white/10',
    'hover:!border-purple-400/50',
    'hover:!text-white',

    // Classes per checkbox e altri componenti PrimeNG
    '[&_.p-checkbox-box]:!bg-white/10',
    '[&_.p-checkbox-box]:!border-white/20',
    '[&_.p-checkbox-box.p-highlight]:!bg-purple-500',
    '[&_.p-checkbox-box.p-highlight]:!border-purple-500',

    // Classes per messaggi
    '[&_.p-message]:!bg-red-500/10',
    '[&_.p-message]:!border-red-500/20',
    '[&_.p-message-text]:!text-red-400',
  ],
  theme: {
    extend: {
      animation: {
        // Animazioni esistenti
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'float-slower': 'float-slow 25s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'energy-line-1': 'energy-pulse-1 2s ease-in-out infinite',
        'energy-line-2': 'energy-pulse-2 2s ease-in-out infinite 0.5s',
        'energy-line-3': 'energy-pulse-3 2s ease-in-out infinite 1s',
        'energy-line-4': 'energy-pulse-4 2s ease-in-out infinite 1.5s',
        'bounce-dot-1': 'bounce-dot 1.5s ease-in-out infinite',
        'bounce-dot-2': 'bounce-dot 1.5s ease-in-out infinite 0.3s',
        'bounce-dot-3': 'bounce-dot 1.5s ease-in-out infinite 0.6s',
        'float-icon-1': 'float-icon 8s ease-in-out infinite',
        'float-icon-2': 'float-icon 10s ease-in-out infinite -3s',
        'float-icon-3': 'float-icon 12s ease-in-out infinite -6s',

        // === NUOVE ANIMAZIONI PER LA LIBRERIA ===
        float: 'float 3s ease-in-out infinite',
        'gradient-xy': 'gradient-xy 10s ease infinite',
        slideDown: 'slideDown 0.3s ease-out',
        shake: 'shake 0.5s ease-in-out',
      },
      keyframes: {
        // Keyframes esistenti
        'float-slow': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0) scale(1)',
          },
          '25%': {
            transform: 'translateY(-30px) translateX(20px) scale(1.05)',
          },
          '50%': {
            transform: 'translateY(20px) translateX(-30px) scale(0.95)',
          },
          '75%': {
            transform: 'translateY(-20px) translateX(-20px) scale(1.02)',
          },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.1', transform: 'scale(1)' },
          '50%': { opacity: '0.2', transform: 'scale(1.1)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'energy-pulse-1': {
          '0%, 100%': { opacity: '0.3', height: '1rem' },
          '50%': { opacity: '1', height: '1.5rem' },
        },
        'energy-pulse-2': {
          '0%, 100%': { opacity: '0.3', height: '1rem' },
          '50%': { opacity: '1', height: '1.5rem' },
        },
        'energy-pulse-3': {
          '0%, 100%': { opacity: '0.3', width: '1rem' },
          '50%': { opacity: '1', width: '1.5rem' },
        },
        'energy-pulse-4': {
          '0%, 100%': { opacity: '0.3', width: '1rem' },
          '50%': { opacity: '1', width: '1.5rem' },
        },
        'bounce-dot': {
          '0%, 100%': {
            transform: 'translateY(0)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'translateY(-8px)',
            opacity: '1',
          },
        },
        'float-icon': {
          '0%, 100%': {
            transform: 'translateY(0) rotate(0deg)',
            opacity: '0.6',
          },
          '25%': {
            transform: 'translateY(-15px) rotate(90deg)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'translateY(-10px) rotate(180deg)',
            opacity: '1',
          },
          '75%': {
            transform: 'translateY(-20px) rotate(270deg)',
            opacity: '0.8',
          },
        },

        // === NUOVE KEYFRAMES PER LA LIBRERIA ===
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            backgroundPosition: 'left top',
          },
          '50%': {
            backgroundPosition: 'right bottom',
          },
        },
        slideDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-2px)',
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(2px)',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
