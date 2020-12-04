import { Telefone } from './telefone';

export class User {
  id: number;
  login: string;
  nome: string;
  cpf: string;
  senha: string;
  salario: number;
  taxaComissao: number;
  dataNascimetno: string;

  telefones: Array<Telefone>;
}
