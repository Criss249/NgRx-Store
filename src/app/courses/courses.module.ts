import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { CoursesCardListComponent } from "./courses-card-list/courses-card-list.component";
import { EditCourseDialogComponent } from "./edit-course-dialog/edit-course-dialog.component";
import { CoursesHttpService } from "./services/courses-http.service";
import { CourseComponent } from "./course/course.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from "@ngrx/data";

import { CourseEntityService } from "./services/course-entity.service";
import { CourseResolver } from "./services/course.resolver";
import { CoursesDataService } from "./services/courses-data.service";
import { compareCourses } from "./model/course";

export const coursesRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: {
      courses: CourseResolver,
    },
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    resolve: {
      courses: CourseResolver,
    },
  },
];

/**
 * @EntityMetadataMap
 * interface provide a way to define the entities in the module
 * the value/key provide a series of methods to interact entity data
 */

const EntityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
  },
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent,
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent,
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesHttpService,
    CourseEntityService,
    CourseResolver,
    CoursesDataService,
  ],
})
export class CoursesModule {
  /**
   * @EntityDefinitionService : used to register the entityDataMap
   * @EntityDataService : used to register custom data services
   * @registerService defined a custom behaviour to get data from server instead of use the defaoult behaviour of NgRx Data,
   * it register data fetched from data service in the Store's course entity
   */
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private coursesDataService: CoursesDataService
  ) {
    eds.registerMetadataMap(EntityMetadata);
    entityDataService.registerService("Course", coursesDataService);
  }
}
