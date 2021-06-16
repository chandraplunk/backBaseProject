import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import *  as  data from './../recruitment-fe-assignment-main/bb-ui/mock-data/transactions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myFormGroup: FormGroup;
  closeResult: string;
  receiverAccountName: string;
  receiverAccountAmount: number;
  transactionList: any;
  displayData: any;


  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.myFormGroup = this.fb.group({
      fromAccount: [],
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, this.validateamount, Validators.pattern(/^\d*\.?\d*$/)]]
    });

  }

  ngOnInit() {
    this.transactionList = data.data;
    this.sortList();
    this.transactionList.forEach((element: any) => {
      if (element.transaction.creditDebitIndicator === 'CRDT' || element.transaction.creditDebitIndicator === 'DBIT') {
        element.transaction.creditDebitIndicator = 'Card Payment';
      }
      let tempDate = '' + new Date(element.dates.valueDate);
      element.displayDate = tempDate.slice(4, 10);
      element.dates.valueDate = tempDate;
      element.infoo = new Date(element.dates.valueDate);
      element.categoryCode = '6px solid' + element.categoryCode;
    });
    this.myFormGroup.controls['fromAccount'].setValue('My Personal Account: € 5824.76');
    this.myFormGroup.controls['fromAccount'].disable();
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'transfer') {
        let date = '' + new Date();
        let today = date.slice(4, 10);
        let tempdata = {
          "merchant": {
            "name": this.myFormGroup.get('name').value,
          },
          "dates": {
            "valueDate": date,
          },
          "displayDate": today,
          "categoryCode": "6px solid #fbbb1b",
          "transaction": {
            "type": "Transaction",
            "creditDebitIndicator": "Online Transfer",
            "amountCurrency": {
              "currencyCode": "EUR",
              "amount": this.myFormGroup.get('amount').value
            }
          }
        };
        this.transactionList.push(tempdata);
        console.log(tempdata);
        this.sortList();
        console.log('ttt');
        this.myFormGroup.get('amount').setValue('');
        this.myFormGroup.get('amount').markAsUntouched();
        this.myFormGroup.get('name').setValue('');
        this.myFormGroup.get('name').markAsUntouched();
        this.myFormGroup.get('amount').setErrors({'incorrect': false});
        
      }
    });
  }

  sortList() {
    const sorted = this.transactionList.sort((a, b) => {
      b = new Date(b.dates.valueDate).getTime();
      a = new Date(a.dates.valueDate).getTime();
      return b - a;
    });
    console.log(sorted);
    this.transactionList = sorted;
  }

  filterData(filterBy: any) {
    if (filterBy.length > 0) {
      filterBy = filterBy.toLocaleLowerCase();
      this.transactionList = this.transactionList.filter((product: any) =>
        product.merchant.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } else {
      this.transactionList = data.data;
    }
    this.sortList();
  }

  validateamount(controller: AbstractControl): { [key: string]: any } {
    console.log(controller.value);
    if (controller.value < 500) {
      console.log("Inside If Block");
      return {
        amountInvalide: true
      };
    }
    if (controller.value < 0) {
      return {
        amountNegative: true
      };
    }
    console.log("Returning null");
    return null;
  }

}
