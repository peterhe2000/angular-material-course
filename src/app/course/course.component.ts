import {
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;
  dataSource = new MatTableDataSource([]);
  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService) {

  }

  ngOnInit() {

    this.course = this.route.snapshot.data['course'];
    this.coursesService.findAllCourseLessons(this.course.id)
      .subscribe(lessons => this.dataSource.data = lessons);
  }

  searchLessons(search = '') {
    this.dataSource.filter = search.toLowerCase().trim();
  }

  ngAfterViewInit() {

  }

}
