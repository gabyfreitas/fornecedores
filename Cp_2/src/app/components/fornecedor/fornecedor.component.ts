import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Fornecedor } from '../../interfaces/fornecedor';
import { FornecedorService } from '../../services/fornecedor.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'
})
export class FornecedorComponent {
  fornecedores:Fornecedor[] = [];
  fornecedorForm: FormGroup = new FormGroup({})

  constructor(private fornecedorService:FornecedorService, private formbuilder: FormBuilder) {
  this.fornecedorForm = this.formbuilder.group({
    nome: ['', Validators.required],
    endereco: ['', Validators.required],
    telefone: ['', Validators.required]
  })

 }

 generateRandomString(length: number): string  {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
 } 

 inserir(){
  if(this.fornecedorForm.valid){
    const fornecedorNovo:Fornecedor = {
      nome: this.fornecedorForm.value.nome,
      endereco: this.fornecedorForm.value.endereco,
      telefone: this.fornecedorForm.value.telefone,
      id: this.generateRandomString(6)
    }
    this.fornecedorForm.reset()

    this.fornecedores.push(fornecedorNovo)

    this.fornecedorService.adicionar(fornecedorNovo).subscribe()
    alert('Fornecedor cadastrado com sucesso!')

  }
 }

 listar():void{
    this.fornecedorService.listar().subscribe((listFornecedor) => (this.fornecedores = listFornecedor))
 }

 ngOnInit():void{
   this.listar();
 }

 remover(id:string):void{
  this.fornecedores = this.fornecedores.filter((f) => f.id !== id)
  this.fornecedorService.remover(id).subscribe()
  alert('Fornecedor removido com sucesso!')
 }

}