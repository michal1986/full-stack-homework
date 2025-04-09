export const ANIMATION_CONFIG = {
  duration: process.env.NEXT_PUBLIC_ANIMATION_DURATION ? 
    parseFloat(process.env.NEXT_PUBLIC_ANIMATION_DURATION) : 0.3,
  delay: process.env.NEXT_PUBLIC_ANIMATION_DELAY ? 
    parseFloat(process.env.NEXT_PUBLIC_ANIMATION_DELAY) : 0.05,
}; 