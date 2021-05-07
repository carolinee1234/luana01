import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(

    // Injeta dependências
    public auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {}

  logout() {
    this.auth.signOut()
    .then(
      () => {

        // Redireciona para 'inicio'
        this.router.navigate(['/home']);
      }
    )
    .catch();
  }
}
