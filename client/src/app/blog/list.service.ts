import { Injectable } from '@angular/core';
import { AppConfig } from '../blog/appconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostListItem } from '../blog/list/model/postlistitem';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly URL = AppConfig.url + "/blogs";

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<PostListItem[]> {
    return this.httpClient.get<PostListItem[]>(this.URL);
  }

  createBlog(blog: PostListItem): Observable<PostListItem> {
    return this.httpClient.post<PostListItem>(`${this.URL}/create`, blog);
  }
}
