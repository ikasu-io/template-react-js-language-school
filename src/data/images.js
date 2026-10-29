// Every photo on the site. Add a photo: put the file in src/images/ (at
// least 1600 px wide), import it here with `?photo` and give it an alt text
// in each language, under `images` in src/locales/<language>.json. The build
// makes WebP files in four widths from each.
import heroClassroom from '../images/hero-classroom.jpg?photo';
import whiteboardHands from '../images/whiteboard-hands.jpg?photo';
import cityWalk from '../images/city-walk.jpg?photo';
import kitchenBreak from '../images/kitchen-break.jpg?photo';
import notebooks from '../images/notebooks.jpg?photo';
import courtyard from '../images/courtyard.jpg?photo';
import onlineLesson from '../images/online-lesson.jpg?photo';

const images = {
  'hero-classroom': heroClassroom,
  'whiteboard-hands': whiteboardHands,
  'city-walk': cityWalk,
  'kitchen-break': kitchenBreak,
  notebooks,
  courtyard,
  'online-lesson': onlineLesson,
};

export default images;
