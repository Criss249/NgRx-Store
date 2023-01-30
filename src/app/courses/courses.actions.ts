import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

export const loadAllCourses = createAction(
  "[Courses resolver] Load All Couses"
);

/**
 * allCoursesLoaded
 * @props define the payload for loaded courses action
 */
export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All courses loaded",
  props<{ courses: Course[] }>()
);
