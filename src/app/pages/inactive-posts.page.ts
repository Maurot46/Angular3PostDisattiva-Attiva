import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { getPosts, modify } from '../posts.service';

@Component({
  template: `
      <div class="container mt-5" >
      <div *ngFor="let post of posts; let i = index" ><!--definisco un indice unico per ogni post-->
        <div *ngIf="!post.active" class="card mb-4" >
          <h5 class="card-header">Post</h5>
          <div class="card-body" [ngClass]="{
        'bg-warning': post.type == 'news',
        'bg-info': post.type == 'education',
        'bg-dark': post.type == 'politic',
        'text-white': post.type == 'politic'
      }"><!-- lo stile dello sfondo cambia in base al type definito nel json assegnando una classe variabile-->
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">
              {{ post.body }}
            </p>
            <button (click)="activePosts(post.id, i)"class='btn btn-primary'>attiva</button><!-- usando il click uso il metodo della classe passandogli l'id del post e l'indice attuali-->
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class InactivePostsPage implements OnInit {
  posts!: Post[];//dichiaro il tipo di formato dei miei post di tipo array
  constructor() {
  }

  async ngOnInit() {//al caricamento carico tutti i post
    const posts = await getPosts();
    this.posts = posts;
    console.log(posts)//semplice console.log per assicurarsi della lettura dei dati
  }

  activePosts(id: number, i:number) {
    modify({active: true}, id)//chiama il metodo feinito nel service e alla propietà active la faccio diventare true
    this.posts.splice(i,1)//lo splice dell'indice del post
  }

}
