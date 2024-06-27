import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService, User } from '@auth0/auth0-angular';
import { AuthSwitchService } from 'src/app/auth-switch.service';
import { MasterService } from 'src/app/service/master.service'; // Substitua pelo seu serviço real

@Component({
  selector: 'app-bid-modal',
  templateUrl: './bid-modal.component.html',
  styleUrls: ['./bid-modal.component.css']
})
export class BidModalComponent implements OnInit {
  bidForm!: FormGroup;
  userId: number | null = null;
  userName: string = '';
  valorBase: number = 0;
  maiorLicitacao: number | null = null;
  valorMinimo: number = 0; // Variável para armazenar o valor mínimo da licitação

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BidModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MasterService,
    private authSwitchService: AuthSwitchService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user) {
        const userEmail = user.email || '';
        this.getUserByEmail(userEmail);
        this.userName = user.name || '';
      }
    });

    // Carregar informações do leilão (valor base e maior licitação)
    this.service.getLeilaoById(this.data.leilaoId).subscribe(
      (auctionDetails: any) => {
        this.valorBase = auctionDetails.valor_base || 0;
        this.maiorLicitacao = auctionDetails.maior_licitacao || null;

        // Calcular o valor mínimo da licitação
        this.valorMinimo = this.maiorLicitacao !== null ? this.maiorLicitacao : this.valorBase;
      },
      (error) => {
        console.error('Erro ao carregar detalhes do leilão:', error);
      }
    );
    this.bidForm = this.fb.group({
      valor_licitacao: [null, Validators.required]
    });
  
    this.bidForm.get('valor_licitacao')?.setValidators(Validators.min(this.valorMinimo));
  }

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police';
  }

  getUserByEmail(email: string): void {
    if (!this.isPoliceUser()) {
      this.service.getUserByEmail(email).subscribe(
        (data: any) => {
          this.userId = data.id;
          this.bidForm.patchValue({
            generaluser: this.userId // Atualizando o campo generaluser com o userId
          });
        },
        (error) => {
          console.error('Erro ao carregar usuário:', error);
        }
      );
    } else {
      this.service.getPoliceUserByEmail(email).subscribe(
        (data: any) => {
          this.userId = data.id;
          this.bidForm.patchValue({
            generaluser: this.userId // Atualizando o campo generaluser com o userId
          });
        },
        (error) => {
          console.error('Erro ao carregar usuário:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.bidForm.valid) {
      const valor_licitacao = this.bidForm.value.valor_licitacao;

      // Verificar se o valor da licitação é maior ou igual ao mínimo permitido
      if (valor_licitacao < this.valorMinimo) {
        return;
      }

      // Montar objeto de licitação para enviar ao servidor
      const licitacaoData = {
        valor_licitacao: valor_licitacao,
        leilao: this.data.leilaoId, // Supondo que você passe o leilaoId via MAT_DIALOG_DATA
        id_user: this.userId, // Usar o userId obtido
        data: new Date().toISOString() // Adicionar data da licitação
      };

      console.log('Enviando licitação:', licitacaoData);

      // Chamar serviço para enviar licitação para o servidor
      this.service.addBid(licitacaoData).subscribe({
        next: (response: any) => {
          console.log('Licitacao criada com sucesso:', response);

          // Após criar a licitação com sucesso, atualize o valor no leilão
          this.service.updateBidValueInAuction(this.data.leilaoId, valor_licitacao).subscribe({
            next: (updateResponse: any) => {
              console.log('Valor da licitação atualizado no leilão:', updateResponse);
              this.dialogRef.close(true); // Fechar modal com sucesso
            },
            error: (updateError: any) => {
              console.error('Erro ao atualizar valor da licitação no leilão:', updateError);
              // Tratamento de erro ao atualizar valor no leilão
              this.dialogRef.close(false); // Fechar modal com erro
            }
          });
        },
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
