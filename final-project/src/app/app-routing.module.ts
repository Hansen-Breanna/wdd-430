import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GiftDetailComponent } from "./gifts/gift-detail/gift-detail.component";
import { GiftEditComponent } from "./gifts/gift-edit/gift-edit.component";
import { GiftsComponent } from "./gifts/gifts.component";

import { PersonDetailComponent } from "./persons/person-detail/person-detail.component";
import { PersonEditComponent } from "./persons/person-edit/person-edit.component";
import { PersonsComponent } from "./persons/persons.component";

const appRoutes: Routes = [
    
    { path: '', redirectTo: '/persons', pathMatch: 'full'},
    { path: 'persons', component: PersonsComponent, children: [
        { path: 'new', component: PersonEditComponent},
        { path: ':personId', component: PersonDetailComponent},
        { path: ':personId/edit', component: PersonEditComponent},
        { path: ':personId/add', component: GiftEditComponent},
        { path: ':giftId/', component: GiftDetailComponent},
    ]},
    { path: 'gifts', component: GiftsComponent, children: [
        { path: 'new', component: GiftEditComponent},
        { path: ':giftId', component: GiftDetailComponent},
        { path: ':giftId/edit', component: GiftEditComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}