import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

@Injectable({
  providedIn: "root",
})
/**
 * @CourseResolver
 * service in charge of return courses data to home component
 */
export class CourseResolver implements Resolve<boolean> {
  constructor(private courseEntityService: CourseEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    /**
     * @loaded$
     * flag to provide an status of the successfull loaded data from the server
     * if the data is not yet loaded, the @courseEntityService is going to trigger a new request to the server as a side effect
     */
    return this.courseEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.courseEntityService.getAll();
        }
      }),
      //make sure to wait for the data to be loaded in the store
      filter((loaded) => !!loaded),
      //route transition will not to be completed until the observable will be completed
      first()
    );
  }
}
