import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {LogoComponent} from './../recruitment-fe-assignment-main/bb-ui/components/logo/logo.component';
import { FooterComponent } from './../recruitment-fe-assignment-main/bb-ui/components/footer/footer.component';
import { SubmitButtonComponent } from './../recruitment-fe-assignment-main/bb-ui/components/submit-button/submit-button.component';
import { TransactionItemComponent } from './../recruitment-fe-assignment-main/bb-ui/components/transaction-item/transaction-item.component'; 
import { FilterComponent } from './../recruitment-fe-assignment-main/bb-ui/components/filter/filter.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    FooterComponent,
    SubmitButtonComponent,
    TransactionItemComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
