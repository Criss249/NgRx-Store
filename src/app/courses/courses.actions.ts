import { Update } from "@ngrx/entity";
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

/**
 * courseUpdated
 * @props provide the updated info as a payload
 * @Update <Course> is an specific type from @ngrx/entity that let us modify data store in the store in the entity format
 * @Update use a Partial TS interface to define all the model's properties as not mandatory "?" , with this we just need
 * to update the model's properties that had been modified
 */
export const courseUpdated = createAction(
  "[Edit course dialog] course updated",
  props<{ update: Update<Course> }>()
);
