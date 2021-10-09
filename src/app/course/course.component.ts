import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { merge } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { LessonsDataSource } from '../services/lessons.datasource';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;
  dataSource: LessonsDataSource;
  displayedColumns = ['seqNo', 'description', 'duration'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService) {

  }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.dataSource = new LessonsDataSource(this.coursesService);
    this.dataSource.loadLessons(
      this.course.id,
      '',
      'asc',
      0,
      3);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator)
    .subscribe((value) => {
      this.dataSource.loadLessons(
        this.course.id,
        '',
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
    });
  }
}
