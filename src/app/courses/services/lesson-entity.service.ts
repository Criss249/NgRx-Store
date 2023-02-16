import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Lesson } from "../model/lesson";

@Injectable()

/**
 * @EntityCollectionServiceBase and @EntityCollectionServiceElementsFactory
 * creates some of the core elements to enable to build the course entity service
 * @super pass the elements factory directly to the @EntityCollectionServiceElementsFactory constructor, receives two parameters:
 *** "Course" - the entity associated
 *** "serviceElementsFactory" - the elements factory
 */
export class LessonEntityService extends EntityCollectionServiceBase<Lesson> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Lesson", serviceElementsFactory);
  }
}
