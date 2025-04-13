import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      firstName
      lastName
      email
      roleId
      dob
      phoneNumber
      status
      role
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      firstName
      lastName
      email
      roleId
      dob
      phoneNumber
      status
      role
    }
  }
`;

export const GET_ALL_COURSES = gql`
  query GetAllCourses {
    getAllCourses {
      id
      title
      duration
      credits
      facultyId
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  query GetCourseById($id: UUID!) {
    getCourseById(id: $id) {
      id
      title
      duration
      credits
      facultyId
    }
  }
`;
