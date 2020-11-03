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

  novo() {
    this.usuario = new User();
  }


}
