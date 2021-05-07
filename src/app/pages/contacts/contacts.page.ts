import { Component, OnInit } from '@angular/core';

// Importa dependências
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

// Importa Autenticador
import { AngularFireAuth } from '@angular/fire/auth';

// Validação (filtro) personalizado
// Não permite compos somente com espaços
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  // Atributos
  public contactForm: FormGroup;        // Cria o formulário
  public pipe = new DatePipe('en_US');  // Formatador de datas

  constructor(

    // Injeta dependências
    public form: FormBuilder,
    public afs: AngularFirestore,
    public alert: AlertController,
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {

    // Cria os campos do formulário
    this.contactFormCreate();

    // Preenche nome e email se usuário está logado
    if (this.contactForm) {
      this.auth.onAuthStateChanged(
        (userData) => {
          if(userData) {
            this.contactForm.controls.name.setValue(userData.displayName.trim());
            this.contactForm.controls.email.setValue(userData.email.trim());
          }
        }
      );
    }
  }

  // Cria os campos do formulário
  contactFormCreate() {

    this.contactForm = this.form.group({

      // Data de envio (date)
      date: [''],

      // Status do contato (status)
      status: ['Enviado'],

      // Nome do remetente (name)
      name: [                       // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // E-mail do remetente (email)
      email: [                      // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.email,         // Deve ser um e-mail válido
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // Assunto do contato (subject)
      subject: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(5),  // Deve ter pelo menos 5 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // Mensagem do contato (message)
      message: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(5),  // Deve ter pelo menos 5 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ]
    });
  };

  // Processa e envia o formulário para o databse
  contactSend() {

    // Gera e formata a data de envio
    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss')
    );

    // Salva no Firestore
    this.afs.collection('contacts').add(this.contactForm.value)

    // Se salvar
    .then(
      () => {

        // Feedback
        this.feedback();
      }
    )

    // Se deu erro
    .catch(
      (error) => {
        alert(`Oooops! Algo deu erro! ${error}.`);
      }
    );

    return false;
  }

  // Popup de feedback
  async feedback() {

    // Obtém somente primeiro nome do remetente
    var name = this.contactForm.controls.name.value.split(' ');

    const alert = await this.alert.create({
      header: `Olá ${name[0]}!`,
      message: 'Seu contato foi enviado com sucesso para a equipe do aplicativo.',
      buttons : [

        // Botão [Ok]
        {
          text: 'Ok',
          handler: () => {

            // Reset do formulário
            this.contactForm.reset({

              // Mantém o nome e e-mail do rementente
              name: this.contactForm.controls.name.value,
              email: this.contactForm.controls.email.value
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
