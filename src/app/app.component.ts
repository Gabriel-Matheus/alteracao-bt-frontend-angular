import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Projeto {
  sgProjeto: string;
  cdProjeto: string;
  dsProjeto: string;
}

interface Material {
  cdMaterial: string;
  nrPn: string;
}

interface Boletim {
  idBoletim: string;
  nrBoletim: string;
  cdMaterial: string;
  dtInsert:string;
  nrRevisao: string;
  dtRevisao: string;
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
  materiais: Material[] = [];
  boletins: Boletim[]= [];
  filteredCdProjetos: Projeto[] = [];
  filteredSgProjetos: Projeto[] = [];
  selectedCdProjeto: string = '';
  selectedSgProjeto: string = '';
  selectedDsProjeto: string = '';
  selectedCdMaterial: string = '';
  selectedNrPn: string = '';
  isOpenCdProjetoButton: boolean = false; // Adicionando estado para manter a lista aberta ou fechada
  isOpenSgProjetoButton: boolean = false;

  constructor(private http: HttpClient) {}

  // Função para buscar os dados do backend
  update() {
    this.http.get<Projeto[]>("http://localhost:8080").subscribe((data) => {
      this.projetos = data;
      this.filteredCdProjetos = data;
      this.filteredSgProjetos = data;
    });
  }

  onButtonCdProject(){
    this.http.get<Material[]>(`http://localhost:8080/buscar-materiais?cdProjeto=${this.selectedCdProjeto}`).subscribe((data) => {
    this.materiais = data;
    });
    let projetoEncontrado: Projeto | undefined = this.projetos.find(projeto => projeto.cdProjeto == this.selectedCdProjeto)
    if(projetoEncontrado) {
      this.selectedSgProjeto = projetoEncontrado.sgProjeto;
      this.selectedDsProjeto = projetoEncontrado.dsProjeto;
    }
  }

  onButtonSgProject(){
    let projetoEncontrado: Projeto | undefined = this.projetos.find(projeto => projeto.sgProjeto == this.selectedSgProjeto)
    if(projetoEncontrado){
      this.selectedCdProjeto = projetoEncontrado.cdProjeto;
      this.selectedDsProjeto = projetoEncontrado.dsProjeto;
      this.http.get<Material[]>(`http://localhost:8080/buscar-materiais?cdProjeto=${this.selectedCdProjeto}`).subscribe((data) => {
        this.materiais = data;
      });
    }
  }


  onButtonMaterial(nrPn: string): void{
    let materialEncontrado: Material | undefined = this.materiais.find(material => material.nrPn == nrPn)
    if(materialEncontrado) {
      this.selectedCdMaterial = materialEncontrado.cdMaterial;
      this.http.get<Boletim[]>(`http://localhost:8080/buscar-boletins?cdMaterial=${this.selectedCdMaterial}`).subscribe((data) => {
        this.boletins = data;
      });
    }
  }


  onBlurCdProjeto() : void {
    setTimeout(() => {
      this.isOpenCdProjetoButton = false }, 200);
  }

  onBlurSgProjeto() : void {
    setTimeout(() => {
      this.isOpenSgProjetoButton = false }, 200);
  }

  onFocusCdProjeto() : void {
    this.filteredCdProjetos = this.projetos.filter(projeto =>
      projeto.cdProjeto.toLowerCase().startsWith(this.selectedCdProjeto.toLowerCase())
    );
    this.isOpenCdProjetoButton=true;
  }

  onFocusSgProjeto() : void {
    this.filteredSgProjetos = this.projetos.filter(projeto =>
      projeto.sgProjeto.toLowerCase().startsWith(this.selectedSgProjeto.toLowerCase())
    );
    this.isOpenSgProjetoButton=true;
  }

  onSearchCdProjeto(query: string): void {
    if (query) {
      this.filteredCdProjetos = this.projetos.filter(projeto =>
        projeto.cdProjeto.toLowerCase().startsWith(query.toLowerCase())
      );
      this.isOpenCdProjetoButton=true;
    } else {
      this.filteredCdProjetos = this.projetos;
    }
  }

  onSelectCdProjeto(projeto: Projeto): void {
    this.selectedCdProjeto = projeto.cdProjeto;
    setTimeout(() => {
      this.isOpenCdProjetoButton = false }, 200);
  }

  onSearchSgProjeto(query: string): void {
    if (query) {
      this.filteredSgProjetos = this.projetos.filter(projeto =>
        projeto.sgProjeto.toLowerCase().startsWith(query.toLowerCase())
      );
      this.isOpenSgProjetoButton=true;
    } else {
      this.filteredSgProjetos = this.projetos;
    }
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
