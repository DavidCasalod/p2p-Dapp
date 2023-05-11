import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/adminLTE/content/content.component';
import { FooterComponent } from './components/adminLTE/footer/footer.component';
import { HeaderComponent } from './components/adminLTE/header/header.component';
import { SidebarComponent } from './components/adminLTE/sidebar/sidebar.component';
import { ReadComponent } from './components/read/read.component';
import { AuthGuardModalComponent } from './components/auth-guard-modal/auth-guard-modal.component';
import { ListOfContractsComponent } from './components/list-of-contracts/list-of-contracts.component';
import { ContractService } from './services/contract.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ReadComponent,
    AuthGuardModalComponent,
    ListOfContractsComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,

    
    
    
  ],
  providers: [ContractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
