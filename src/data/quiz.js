// The placement quiz: ten questions, getting harder. `answer` is the index
// of the right option. The result is a level from how many are right
// (see `levelForScore` at the bottom).
const quiz = [
  { question: 'Ich ___ aus Spanien.', options: ['komme', 'kommst', 'kommt'], answer: 0 },
  { question: 'Wie ___ du?', options: ['heiße', 'heißt', 'heißen'], answer: 1 },
  { question: 'Ich habe ___ Bruder und zwei Schwestern.', options: ['eine', 'einen', 'einem'], answer: 1 },
  { question: 'Gestern ___ ich ins Kino gegangen.', options: ['habe', 'bin', 'war'], answer: 1 },
  { question: 'Ich helfe ___ Nachbarin mit dem Umzug.', options: ['die', 'der', 'den'], answer: 1 },
  { question: 'Ich weiß nicht, ob er morgen ___.', options: ['kommt', 'kommt er', 'er kommt'], answer: 0 },
  { question: 'Wenn ich mehr Zeit ___, würde ich öfter reisen.', options: ['habe', 'hätte', 'hatte'], answer: 1 },
  { question: 'Das ist der Kollege, ___ ich gestern geholfen habe.', options: ['den', 'dem', 'der'], answer: 1 },
  { question: 'Das Haus ___ im Jahr 1902 gebaut.', options: ['wurde', 'würde', 'war'], answer: 0 },
  { question: '___ des schlechten Wetters fand das Fest statt.', options: ['Wegen', 'Trotz', 'Statt'], answer: 1 },
];

export function levelForScore(score) {
  if (score <= 2) return 'A1';
  if (score <= 4) return 'A2';
  if (score <= 6) return 'B1';
  if (score <= 8) return 'B2';
  return 'C1';
}

export default quiz;
