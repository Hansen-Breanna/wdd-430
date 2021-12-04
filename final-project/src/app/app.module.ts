import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PersonsComponent } from './persons/persons.component';
import { GiftsComponent } from './gifts/gifts.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonEditComponent } from './persons/person-edit/person-edit.component';
import { PersonListComponent } from './persons/person-list/person-list.component';
import { PersonItemComponent } from './persons/person-list/person-item/person-item.component';
import { GiftDetailComponent } from './gifts/gift-detail/gift-detail.component';
import { GiftEditComponent } from './gifts/gift-edit/gift-edit.component';
import { GiftListComponent } from './gifts/gift-list/gift-list.component';
import { GiftItemComponent } from './gifts/gift-list/gift-item/gift-item.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonsComponent,
    GiftsComponent,
    PersonDetailComponent,
    PersonEditComponent,
    PersonListComponent,
    PersonItemComponent,
    GiftDetailComponent,
    GiftEditComponent,
    GiftListComponent,
    GiftItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
