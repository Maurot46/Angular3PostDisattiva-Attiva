import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { getPosts, modify } from '../posts.service';

@Component({
  template: `
      <div class="container mt-5" >
      <div *ngFor="let post of posts; let i = index" >
        <div *ngIf="!post.active" class="card mb-4" >
          <h5 class="card-header">Post</h5>
          <div class="card-body" [ngClass]="{
        'bg-warning': post.type == 'news',
        'bg-info': post.type == 'education',
        'bg-dark': post.type == 'politic',
        'text-white': post.type == 'politic'
      }">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">
              {{ post.body }}
            </p>
            <button (click)="activePosts(post.id, i)"class='btn btn-primary'>attiva</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class InactivePostsPage implements OnInit {
  posts!: Post[];
  constructor() {
  }

  async ngOnInit() {
    const posts = await getPosts();
    this.posts = posts;
    console.log(posts)
  }

  activePosts(id: number, i:number) {
    modify({active: true}, id)
    this.posts.splice(i,1)
  }

}
