import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { PostListItem } from './model/postlistitem';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'subtitle', 'imageURL', 'content'];

  isLoading = false;

  postListSubject: BehaviorSubject<PostListItem[]> = new BehaviorSubject(null);

  constructor(private postService: ListService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.findAll()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((postListItems) => this.postListSubject.next(postListItems));
  }

  createPost() {
    const ref = this.matDialog.open(DialogComponent, {
      width: '600px'
    });

    ref.afterClosed().subscribe((newPost: PostListItem) => {
      if (newPost) {
        const list = this.postListSubject.getValue();
        list.push(newPost);
        this.postListSubject.next(_.cloneDeep(list));
      }
    });
  }
}
