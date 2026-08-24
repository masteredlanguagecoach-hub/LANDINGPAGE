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
 * Gets the authoritative price for a course ID from server-side environment configuration.
 * Default fallback is ₹399.
 */
export function getCoursePrice(courseId: string): number {
  if (courseId === 'ML-EN') {
    const envPrice = process.env.COURSE_MALAYALAM_ENGLISH_PRICE;
    return envPrice ? parseInt(envPrice, 10) : 399;
  }
  if (courseId === 'HI-EN') {
    const envPrice = process.env.COURSE_HINDI_ENGLISH_PRICE;
    return envPrice ? parseInt(envPrice, 10) : 399;
  }
  
  // Default price for extended courses
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
 * Returns all available courses with current environment pricing.
 */
export function getAllCourses(): Course[] {
  return COURSES_CATALOG.map((course) => ({
    ...course,
    price: getCoursePrice(course.id),
  }));
}
