import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CoursesActions } from "../action-types";
import { compareCourses, Course } from "../model/course";

/**
 * @EntityState
 * NgRx Entity is a small library that helps us to
 * keep our entities in this ideal Entity state format (array of ids plus map of entities).
 * <cast> specify the type of the entities in the EntityState.
 * allCoursesLoaded is a flag to indicate if the courses have been loaded and the action should be triggered.
 */
export interface CourseState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

/**
 * @Adapters
 * provide a crud operations to interact with the store
 * <cast> the type of the entities in the EntityState
 * sortComparer: receive a function to compare to entities in this case two different courses
 * SelectId: provide a way to define which entity key is the unique identifier in case the name convention doesn't follow the standard
 * providing a parameter we can have acces to an sorting function using the adapter
 */
export const courseAdapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCourseState = courseAdapter.getInitialState({
  allCoursesLoaded: false,
});

export const courseReducer = createReducer(
  initialCourseState,
  // when all courses are loaded
  on(CoursesActions.allCoursesLoaded, (state, action) =>
    courseAdapter.addAll(action.courses, {
      ...state,
      allCoursesLoaded: true,
    })
  ),
  //when a course is updated
  on(CoursesActions.courseUpdated, (state, action) =>
    courseAdapter.updateOne(action.update, state)
  )
);

// export selectAll method from adapter to be used in the selectors file as a way
//get all the selector relared with courses from the store

export const { selectAll } = courseAdapter.getSelectors();
