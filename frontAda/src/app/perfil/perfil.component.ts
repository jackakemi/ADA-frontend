import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user:Usuario = new Usuario()
  postagem:Postagem = new Postagem()
  tema:Tema = new Tema()

  listaPostagem:Postagem[]
  listaTema:Tema[]

  tipoTema: string
  tipoPostagem: string

  idTema:number
  idUser = environment.id
  idcheck:number

  nomeCompleto = environment.nomeCompleto
  foto = environment.foto
  cargo = environment.cargo
  id = environment.id
  link = environment.link

  constructor (

    private router: Router,
    private TemaService: TemaService,
    private PostagemService: PostagemService,
    private AuthService: AuthService, 
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    }
    this.findByIdUser()
  }

  findByIdUser(){
    this.AuthService.getByIdUser(this.id).subscribe((resp: Usuario)=>{
      this.user = resp
      this.listaPostagem = this.user.postagem.reverse()
      console.log(this.listaPostagem)
    })
  }
}
  



