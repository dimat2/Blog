import { Component, OnInit } from '@angular/core';
import { PostListItem } from '../../model/postlistitem';
import { NgForm } from '@angular/forms';
import { ListService } from 'src/app/blog/list.service';

import { finalize } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  newPost: PostListItem = {} as PostListItem;
  isLoading = false;

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private blogService: ListService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.blogService.createBlog(this.newPost)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
        this.dialogRef.close(res),
        console.log(res)
      }, err => console.log(err));
    }
  }

}
