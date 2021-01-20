import { Telefone } from './telefone';

export class User {
  id: number;
  login: string;
  nome: string;
  cpf: string;
  senha: string;
  salario: number;
  taxaComissao: number;
  dataNascimento: string;

  telefones: Array<Telefone>;
}
