import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./reducers";
import * as fromCourses from "./reducers";

export const selectCoursesState = createFeatureSelector<CourseState>("courses");

//selector to get all courses from the store
export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

// selector to get beginner courses from the all courses selector
export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == "BEGINNER")
);

// selector to get advanced courses from the all courses selector
export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == "ADVANCED")
);

// selector to get promo courses quantity from the all courses selector
export const selectPromoCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length
);

//selector to know the status of allCoursesLoaded flag from the state when courses had been loaded from backend
export const selectAllCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.allCoursesLoaded
);
