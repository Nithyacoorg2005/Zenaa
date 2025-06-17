/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Outfit', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    // Dynamic color classes for emotion-based theming
    'bg-blue-50', 'bg-blue-100', 'bg-blue-500', 'bg-blue-600',
    'bg-green-50', 'bg-green-100', 'bg-green-500', 'bg-green-600',
    'bg-purple-50', 'bg-purple-100', 'bg-purple-500', 'bg-purple-600',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-500', 'bg-orange-600',
    'bg-red-50', 'bg-red-100', 'bg-red-500', 'bg-red-600',
    'bg-pink-50', 'bg-pink-100', 'bg-pink-500', 'bg-pink-600',
    'bg-teal-50', 'bg-teal-100', 'bg-teal-500', 'bg-teal-600',
    'bg-indigo-50', 'bg-indigo-100', 'bg-indigo-500', 'bg-indigo-600',
    'bg-gray-50', 'bg-gray-100', 'bg-gray-500', 'bg-gray-600',
    'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900',
    'text-green-600', 'text-green-700', 'text-green-800', 'text-green-900',
    'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900',
    'text-orange-600', 'text-orange-700', 'text-orange-800', 'text-orange-900',
    'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900',
    'text-pink-600', 'text-pink-700', 'text-pink-800', 'text-pink-900',
    'text-teal-600', 'text-teal-700', 'text-teal-800', 'text-teal-900',
    'text-indigo-600', 'text-indigo-700', 'text-indigo-800', 'text-indigo-900',
    'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'border-blue-200', 'border-blue-500',
    'border-green-200', 'border-green-500',
    'border-purple-200', 'border-purple-500',
    'border-orange-200', 'border-orange-500',
    'border-red-200', 'border-red-500',
    'border-pink-200', 'border-pink-500',
    'border-teal-200', 'border-teal-500',
    'border-indigo-200', 'border-indigo-500',
    'border-gray-200', 'border-gray-500',
    'hover:bg-blue-100', 'hover:bg-blue-200', 'hover:bg-blue-600',
    'hover:bg-green-100', 'hover:bg-green-200', 'hover:bg-green-600',
    'hover:bg-purple-100', 'hover:bg-purple-200', 'hover:bg-purple-600',
    'hover:bg-orange-100', 'hover:bg-orange-200', 'hover:bg-orange-600',
    'hover:bg-red-100', 'hover:bg-red-200', 'hover:bg-red-600',
    'hover:bg-pink-100', 'hover:bg-pink-200', 'hover:bg-pink-600',
    'hover:bg-teal-100', 'hover:bg-teal-200', 'hover:bg-teal-600',
    'hover:bg-indigo-100', 'hover:bg-indigo-200', 'hover:bg-indigo-600',
    'hover:bg-gray-100', 'hover:bg-gray-200', 'hover:bg-gray-600',
    'hover:border-blue-300', 'hover:border-green-300', 'hover:border-purple-300',
    'hover:border-orange-300', 'hover:border-red-300', 'hover:border-pink-300',
    'hover:border-teal-300', 'hover:border-indigo-300', 'hover:border-gray-300'
  ]
};