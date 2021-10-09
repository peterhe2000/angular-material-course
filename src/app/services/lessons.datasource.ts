import {
  CollectionViewer,
  DataSource
} from '@angular/cdk/collections';
import {
  BehaviorSubject,
  Observable,
  of
} from 'rxjs';
import {
  catchError,
  finalize
} from 'rxjs/operators';
import { Lesson } from '../model/lesson';
import { CoursesService } from './courses.service';

export class LessonsDataSource implements DataSource<Lesson> {
  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private coursesService: CoursesService) {
  }

  loadLessons(courseId: number,
              filter: string,
              sortDirection: string,
              pageIndex: number,
              pageSize: number): void {
    this.loadingSubject.next(true);
    this.coursesService.findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(lessons => this.lessonsSubject.next(lessons));
  }

  public connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonsSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }
}
