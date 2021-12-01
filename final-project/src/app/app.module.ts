import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PeopleComponent } from './people/people.component';
import { GiftsComponent } from './gifts/gifts.component';
import { PeopleDetailComponent } from './people/people-detail/people-detail.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PeopleItemComponent } from './people/people-list/people-item/people-item.component';
import { GiftDetailComponent } from './gifts/gift-detail/gift-detail.component';
import { GiftEditComponent } from './gifts/gift-edit/gift-edit.component';
import { GiftListComponent } from './gifts/gift-list/gift-list.component';
import { GiftItemComponent } from './gifts/gift-list/gift-item/gift-item.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PeopleComponent,
    GiftsComponent,
    PeopleDetailComponent,
    PeopleEditComponent,
    PeopleListComponent,
    PeopleItemComponent,
    GiftDetailComponent,
    GiftEditComponent,
    GiftListComponent,
    GiftItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
