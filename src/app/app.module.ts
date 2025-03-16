import {NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AlteracaoBtComponent } from './alteracao-bt/alteracao-bt.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlteracaoBtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient(),],
  bootstrap: [AppComponent]
})

export class AppModule {
}
