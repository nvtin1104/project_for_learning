import correctSound from './correct.mp3';
import wrongSound from './error.mp3';
import successSound from './success.mp3';
import clockSound from './clock.mp3';
let correctAudio = new Audio(correctSound);
let successAudio = new Audio(successSound);
let wrongAudio = new Audio(wrongSound);
let clockAudio = new Audio(clockSound);
export const handleSound = (type) => {
  switch (type) {
    case 'correct':
      correctAudio.play();
      break;
    case 'wrong':
      wrongAudio.play();
      break;
    case 'success':
      successAudio.play();
      break;
    case 'clock':
      clockAudio.play();
      break;
    default:
      console.warn(`Unknown sound type: ${type}`);
  }
};
