import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) {}

  usuario: string = '';
  senha: string = '';
  auth: boolean = false
  erroMensagem: string = '';

  onloginclick(){
  this.http.get<boolean>(`http://localhost:8080/confirmar-login?usuario=${this.usuario}&senha=${this.senha}`).subscribe((data) => {
    this.auth = data;
    if(this.auth){
      this.router.navigate(['alteracao-bt']);
    }else{
    this.erroMensagem = 'Usuário ou senha incorretos!';
    console.log('Login errado');
      }
  });
  }
}
