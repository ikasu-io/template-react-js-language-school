import courses from '../data/courses';
import teachers from '../data/teachers';
import { content } from '../content';
import { today } from './format';

// A course's facts from data/courses.js with its texts in one language from
// content/<language>/courses.json. The format names are in src/locales.
function withTexts(course, lang) {
  return { ...course, ...content(lang, 'courses')[course.id] };
}

// Courses that haven't started yet, soonest first.
export function upcomingCourses(lang) {
  const now = today();
  return courses
    .filter((course) => course.start >= now)
    .sort((a, b) => a.start.localeCompare(b.start))
    .map((course) => withTexts(course, lang));
}

export function findCourse(id, lang) {
  const course = courses.find((c) => c.id === id);
  return course && withTexts(course, lang);
}

export function findTeacher(id, lang) {
  const teacher = teachers.find((t) => t.id === id);
  return teacher && { ...teacher, ...content(lang, 'teachers')[id] };
}

export const FORMATS = ['intensive', 'evening', 'online', 'exam'];
