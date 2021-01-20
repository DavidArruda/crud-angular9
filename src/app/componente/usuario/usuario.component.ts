import { Component, OnInit, Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }


  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }


}


@Injectable()
export class FormatDate extends NgbDateParserFormatter {

  readonly DELIMITER = '/'; // 18/10/1987



  parse(value: string): NgbDateStruct | null {

    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct): string | null {

    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}


function validarDia(valor) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  } else {
    return valor;
  }
}

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.css"],
  providers: [{provide: "NgbDateParserFormatter", useClass: FormatDate},
              {provide: NgbDateAdapter, useClass: FormatDateAdapter}]
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
