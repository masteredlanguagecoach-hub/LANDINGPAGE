import { Course } from '@/types';

export const COURSES_CATALOG: Omit<Course, 'price'>[] = [
  {
    id: 'ML-EN',
    name: 'Malayalam to English Speaking Challenge',
    displayLanguage: 'Malayalam → English',
    description: 'Designed specifically for Malayalam speakers looking to overcome hesitations and speak fluent, confident English in everyday situations.',
    currency: 'INR',
    popular: true,
    badge: 'Most Popular in Kerala',
  },
  {
    id: 'HI-EN',
    name: 'Hindi to English Speaking Challenge',
    displayLanguage: 'Hindi → English',
    description: 'Designed specifically for Hindi speakers who want to stop translating in their head and speak natural, fluent English effortlessly.',
    currency: 'INR',
    badge: 'High Conversion',
  },
];

/**
 * Gets the authoritative price for a course ID.
 * Fixed at ₹399 in INR.
 */
export function getCoursePrice(courseId: string): number {
  return 399;
}

/**
 * Returns full course details including server-verified price.
 */
export function getCourseById(courseId: string): Course | null {
  const course = COURSES_CATALOG.find((c) => c.id === courseId);
  if (!course) return null;
  return {
    ...course,
    price: getCoursePrice(course.id),
  };
}

/**
 * Returns all available courses with current pricing.
 */
export function getAllCourses(): Course[] {
  return COURSES_CATALOG.map((course) => ({
    ...course,
    price: getCoursePrice(course.id),
  }));
}
