import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Projeto {
  sgProjeto: string;
  cdProjeto: string;
  dsProjeto: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']  // Corrigindo para "styleUrls"
})
export class AppComponent implements OnInit {
  title = 'alteracao-bt-frontend-angular';

  projetos: Projeto[] = [];
  filteredProjetos: Projeto[] = [];
  selectedCdProjeto: string = '';
  selectedSgProjeto: string = '';
  isOpenCdProjetoButton: boolean = false; // Adicionando estado para manter a lista aberta ou fechada
  isOpenSgProjetoButton: boolean = false;

  constructor(private http: HttpClient) {}

  // Função para buscar os dados do backend
  update() {
    this.http.get<Projeto[]>("http://localhost:8080").subscribe((data) => {
      this.projetos = data;
      this.filteredProjetos = data;
    });
  }

  onBlur() : void {
    setTimeout(() => {
      this.isOpenCdProjetoButton = false }, 200);
  }

  // Função para filtrar os projetos conforme o usuário digita
  onSearchCdProjeto(query: string): void {
    if (query) {
      this.filteredProjetos = this.projetos.filter(projeto =>
        projeto.cdProjeto.toLowerCase().includes(query.toLowerCase())
      );
      this.isOpenCdProjetoButton=true;
    } else {
      this.filteredProjetos = this.projetos;
    }
  }

  onSearchSgProjeto(query: string): void {
    if (query) {
      this.filteredProjetos = this.projetos.filter(projeto =>
        projeto.sgProjeto.toLowerCase().includes(query.toLowerCase())
      );
      this.isOpenSgProjetoButton=true;
    } else {
      this.filteredProjetos = this.projetos;
    }
  }

  // Função para selecionar um projeto
  onSelectCdProjeto(projeto: Projeto): void {
    this.selectedCdProjeto = projeto.cdProjeto;
    setTimeout(() => {
      this.isOpenCdProjetoButton = false }, 200);
  }

  onSelectSgProjeto(projeto: Projeto): void {
    this.selectedSgProjeto = projeto.sgProjeto;
    setTimeout(() => {
      this.isOpenSgProjetoButton = false }, 200);
  }

  ngOnInit() {
    this.update();
  }
}
