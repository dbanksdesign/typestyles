import { keyframes } from 'typestyles';

export const fadeIn = keyframes.create('fadeIn', {
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const spin = keyframes.create('spin', {
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});
