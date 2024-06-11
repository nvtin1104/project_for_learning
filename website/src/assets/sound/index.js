import { Howl } from 'howler';
const correctSound = new Howl({
  src: ['./correct.mp3']
});
const wrongSound = new Howl({
  src: ['./error.mp3']
});
export const handleSound = (sound) => {
  wrongSound.play(function () {
    console.log('Sound played');
  });
};
