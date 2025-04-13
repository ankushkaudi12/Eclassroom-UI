import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($userInput: UserInput) {
    registerUser(userInput: $userInput)
  }
`;

export const SAVE_COURSE = gql`
  mutation SaveCourse($course: CourseInput!) {
    saveCourse(course: $course)
  }
`;

export const ASSIGN_FACULTY_TO_COURSE = gql`
  mutation AssignFacultyToCourse($courseId: UUID!, $facultyId: UUID!) {
    assignFacultyToCourse(courseId: $courseId, facultyId: $facultyId)
  }
`;

export const ENROLL_STUDENTS_TO_COURSE = gql`
  mutation EnrollStudentsToCourse($courseId: UUID!, $studentIds: [UUID!]!) {
    enrollStudentsToCourse(courseId: $courseId, studentIds: $studentIds)
  }
`;
