import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.css"],
})
export class UsuarioComponent implements OnInit {
  students: Array<User[]>;
  nome: string;
  total: number;
  p: number = 1;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getStudentList().subscribe((data) => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

  deleteUsuario(id: number, index: number) {
    if (confirm("Deseja remover este usuário ?")) {
      this.usuarioService.deletarUsuario(id).subscribe((data) => {
        this.students.splice(index, 1); // Remove da tela
      });
    }
  }

  consultarUser() {
    if (this.nome === "") {
      this.usuarioService.getStudentList().subscribe((data) => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.usuarioService.consultarUser(this.nome).subscribe((data) => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    }
  }

  loadPage(page) {
    if (this.nome !== '') {
      this.usuarioService
        .consultarUserPorPage(this.nome, (page - 1))
        .subscribe((data) => {
          this.students = data.content;
          this.total = data.totalElements;
        });
    } else {
      this.usuarioService.getStudentListPage(page - 1).subscribe((data) => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    }
  }
}
