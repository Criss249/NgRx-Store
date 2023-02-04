import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";
import { concatMap, map } from "rxjs/operators";

@Injectable()
export class CourseEffects {
  // first effect to load courses
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      map((courses) => CoursesActions.allCoursesLoaded({ courses }))
    )
  );

  //update event : update data in server
  // add dispatch when the current effect implementation des not trigger a new action
  updateCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoursesActions.courseUpdated),
        concatMap((action) =>
          this.coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}
}
