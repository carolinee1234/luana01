import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(

    // Injeta dependências
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {}

  toProfile() {
    window.open('https://myaccount.google.com/', '_blank');
    return false;
  }

}
