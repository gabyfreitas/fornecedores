import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../interfaces/fornecedor';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedor-detail.component.html',
  styleUrl: './fornecedor-detail.component.css'
})
export class FornecedorDetailComponent {

  fornecedor?: Fornecedor;

  fornecedorForm: FormGroup = new FormGroup({})

  constructor(private route: ActivatedRoute, private fornecedorService: FornecedorService, private formbuilder: FormBuilder){
    this.getFornecedorById()
  }

  id?:string;
  getFornecedorById(){
    this.id = this.route.snapshot.paramMap.get('id') ?? ''

    this.fornecedorService.getById(this.id).subscribe((fornecedorResponse) => this.fornecedor = fornecedorResponse)

    this.fornecedorForm = this.formbuilder.group({
      nome: [this.fornecedor?.nome],
      endereco: [this.fornecedor?.endereco],
      telefone: [this.fornecedor?.telefone],
      id: [this.fornecedor?.id]
    })

  }

  update(): void{
    if (this.fornecedorForm.valid) {
      const fornecedorAlterado: Fornecedor = {
        nome: this.fornecedorForm.value.nome,
        telefone: this.fornecedorForm.value.telefone,
        id: this.fornecedorForm.value.id,
        endereco: this.fornecedorForm.value.endereco,
      }

      this.fornecedorService.atualizar(fornecedorAlterado).subscribe(() => {
        alert('Fornecedor alterado com sucesso!')
      }, (error) => {
        console.error('Erro ao atualizar o fornecedor:', error);
      });
    }
  }
}
