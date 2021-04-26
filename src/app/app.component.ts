import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'inicio', url: '/folder/Inbox', icon: 'mail' },
    { title: 'noticias', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'contatos', url: '/folder/Favorites', icon: 'heart' },
    { title: 'sobre', url: '/folder/Archived', icon: 'archive' },
  ];
  constructor() {}
}
