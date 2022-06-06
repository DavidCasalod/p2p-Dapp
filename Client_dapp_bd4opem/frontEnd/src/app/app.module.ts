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
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CalculateComponent } from './components/calculate/calculate.component';
import { ReadComponent } from './components/read/read.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    FirstRouteComponent,
    LoginComponent,
    AdminComponent,
    CalculateComponent,
    ReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
