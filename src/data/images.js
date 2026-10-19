// Every photo on the site, with its alt text. Add a photo: put the file in
// src/images/ (at least 1600 px wide), import it here with `?photo` and give
// it an alt text. The build makes WebP files in four widths from each.
import heroClassroom from '../images/hero-classroom.jpg?photo';
import whiteboardHands from '../images/whiteboard-hands.jpg?photo';
import cityWalk from '../images/city-walk.jpg?photo';
import kitchenBreak from '../images/kitchen-break.jpg?photo';
import notebooks from '../images/notebooks.jpg?photo';
import courtyard from '../images/courtyard.jpg?photo';
import onlineLesson from '../images/online-lesson.jpg?photo';

const images = {
  'hero-classroom': {
    ...heroClassroom,
    alt: 'A small bright classroom: adults around a long wooden table, a teacher at the whiteboard',
  },
  'whiteboard-hands': {
    ...whiteboardHands,
    alt: 'A teacher’s hand drawing arrows and boxes on a whiteboard',
  },
  'city-walk': {
    ...cityWalk,
    alt: 'A group of students walking through the old town on an autumn afternoon',
  },
  'kitchen-break': {
    ...kitchenBreak,
    alt: 'The school kitchen in the break: a kettle, mugs and a plate of pretzels',
  },
  notebooks: {
    ...notebooks,
    alt: 'Open notebooks, a highlighter and index cards on a wooden desk',
  },
  courtyard: {
    ...courtyard,
    alt: 'The courtyard of the old brick school building with a big linden tree and bicycles',
  },
  'online-lesson': {
    ...onlineLesson,
    alt: 'A laptop on a kitchen table during an online lesson, a notebook and a mug beside it',
  },
};

export default images;
