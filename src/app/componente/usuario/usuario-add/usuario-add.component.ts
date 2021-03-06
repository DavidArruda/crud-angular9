import { Telefone } from './../../../model/telefone';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from './../../../model/user';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getStudent(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null){ //Editando
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
      });

    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => {
        //Salvando novo user
        this.novo();
      });
    }

  }

  deletarTelefone(id, i) {
    if (id === null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }

    if (id !== null && confirm('Deseja remover ?')) {
      this.userService.removerTelefone(id).subscribe(data => {
        this.usuario.telefones.splice(i, 1); //remove o tefone deletado da lista
      });
    }
  }

  addFone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }


}
