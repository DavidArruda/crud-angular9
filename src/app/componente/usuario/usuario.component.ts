import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  students: Observable<User[]>;
  nome: string;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data;
    });
  }

  deleteUsuario(id: number) {
    if (confirm('Deseja remover este usuário ?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        console.log('Retorno do método delete :' + data);
        this.usuarioService.getStudentList().subscribe(data => {
          this.students = data;
        });
      });
    }
  }

  consultarUser(){
    this.usuarioService.consultarUser(this.nome).subscribe(data => {
      this.students = data;
    });
  }

}
