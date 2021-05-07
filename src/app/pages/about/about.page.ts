import { Component, OnInit } from '@angular/core';

// Importa dependências
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  // Atributos
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;

  constructor(
    // Injeta dependências
    private afs: AngularFirestore
  ) {
    // Obtém dados do Firestore
    this.items = afs
      .collection(
        'about',
        (ref) =>
          ref
            .where('status', '==', 'ativo') // Somente com 'status=ativo'
            .orderBy('date', 'desc') // Ordenado pela data decrescente
      )
      .valueChanges({ idField: 'id' });
  }

  ngOnInit() {}
}
