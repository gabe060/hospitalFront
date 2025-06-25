export class HomePageController {
  mensagem: string;
  name: string;
  menuAtivo: string;

  constructor() {
    this.mensagem = 'Bem Vindo!';
    this.name = 'Gerenciador de Hospitais';
    this.menuAtivo = '';
  }
}
