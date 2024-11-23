import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/Services/TransactionService';
import * as CryptoJS from 'crypto-js';
import { enc, mode } from 'crypto-js';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  transactionData = {
    processingCode: '',
    systemTraceNr: '',
    functionCode: '',
    cardNo: '',
    cardHolder: '',
    amountTrxn: '',
    currencyCode: ''
  };
  transactionResponse: any;
  encryptedTransactionData: string = '';
  encryptedKey: string = '';

  constructor(private http: HttpClient, private transactionService: TransactionService) {}

  onSubmit() {
    this.encryptTransactionData();
    this.sendTransactionData();
  }

  encryptTransactionData() {
    this.transactionService.getEncryptionKey().subscribe(response=>
    {
       this.encryptedKey=response
    });
    const transactionString = JSON.stringify(this.transactionData);
    this.encryptedTransactionData = CryptoJS.AES.encrypt(transactionString, this.encryptedKey).toString();

    this.encryptedTransactionData=CryptoJS.AES.encrypt(transactionString,enc.Utf8.parse('1234123412341234'),{
      mode: mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: enc.Utf8.parse('1234123412341235'),
      Keysize: 128 / 8
  }).toString()

    console.log(this.encryptedTransactionData)
  }

  sendTransactionData() {
    this.transactionService.processTransaction(this.encryptedTransactionData,this.encryptedKey).subscribe( response=>{
      this.transactionResponse = response;
    });
  }


  
}
