export const seitaiFilm = {
  src: '/samples/seitai/film-hybrid/journey.mp4',
  secondsPerScene: 4,
  posters: [
    '/samples/seitai/film/welcome.webp',
    ...['listen','observe','care','selfcare'].map(name => `/samples/seitai/film-ai/${name}.webp`),
    '/samples/seitai/film/everyday.webp',
  ],
  english: ['A moment for yourself','Listen to your story','Observe your posture','Care at your own pace','A little care at home','Back to your everyday'],
};
