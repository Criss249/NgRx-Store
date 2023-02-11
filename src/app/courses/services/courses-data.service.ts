import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable({
  providedIn: "root",
})
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator
  ) {
    //user is used to send the parameters to the DefaultDataService extended class
    super("Course", http, httpUrlGenerator);
  }

  // overwrite default behavior to getAll method
  getAll(): Observable<Course[]> {
    return this.http.get("/api/Courses").pipe(map((res) => res["payload"]));
  }
}
