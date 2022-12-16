import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/adminLTE/content/content.component';
import { FooterComponent } from './components/adminLTE/footer/footer.component';
import { HeaderComponent } from './components/adminLTE/header/header.component';
import { SidebarComponent } from './components/adminLTE/sidebar/sidebar.component';
import { FirstRouteComponent } from './components/first-route/first-route.component';
import { ReadComponent } from './components/read/read.component';
import { CalculateComponent } from './components/calculate/calculate.component';
import { QueryComponent } from './components/query/query.component';
import { AuthGuardModalComponent } from './components/auth-guard-modal/auth-guard-modal.component';
import { ListOfContractsComponent } from './components/list-of-contracts/list-of-contracts.component';
import { ContractService } from './services/contract.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    FirstRouteComponent,
    ReadComponent,
    QueryComponent,
    CalculateComponent,
    AuthGuardModalComponent,
    ListOfContractsComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
    
    
  ],
  providers: [ContractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
