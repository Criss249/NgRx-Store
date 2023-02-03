import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { CoursesActions } from "./action-types";
import { Observable } from "rxjs";
import { tap, first, finalize, filter } from "rxjs/operators";
import { selectAllCoursesLoaded } from "./courses.selectors";
import { AppState } from "../reducers";

@Injectable()

/**
 * Angular resolver interface
 * Interface that classes can implement to be a data provider.
 * A data provider class can be used with the router to resolve data during navigation.
 * The interface defines a resolve() method that is invoked right after the ResolveStart router event.
 * The router waits for the data to be resolved before the route is finally activated.
 * @cast <type of data the resolver is fetching>
 * @resolve interface  requires two parameters and returns an observable
 */
export class CoursesResolver implements Resolve<any> {
  loading: boolean = false;
  constructor(private store: Store<AppState>) {}

  // @resolve interface requires two arguments
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectAllCoursesLoaded),
      tap((areCoursesLoadedFlag) => {
        if (!this.loading && !areCoursesLoadedFlag) {
          this.loading = true;

          this.store.dispatch(CoursesActions.loadAllCourses());
        }
      }),
      //validate if data was not fetched from the backend to allow resolver to perform the initial load just when areCoursesLoadedFlag is false
      filter((areCoursesLoadedFlag) => areCoursesLoadedFlag),
      //validates if the the dispatch method reach data from backend and the observable emmits a value and returns a completes state
      first(),
      // as soon as the observable emits the completion state the loading flag is set to false

      finalize(() => {
        this.loading = false;
      })
    );
  }
}
