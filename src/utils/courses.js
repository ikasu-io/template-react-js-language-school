import courses from '../data/courses';
import teachers from '../data/teachers';
import { today } from './format';

export const FORMATS = {
  intensive: 'Intensive',
  evening: 'Evening',
  online: 'Online',
  exam: 'Exam preparation',
};

// Courses that haven't started yet, soonest first.
export function upcomingCourses() {
  const now = today();
  return courses
    .filter((course) => course.start >= now)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function findCourse(id) {
  return courses.find((course) => course.id === id);
}

export function findTeacher(id) {
  return teachers.find((teacher) => teacher.id === id);
}
