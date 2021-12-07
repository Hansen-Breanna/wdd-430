import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GiftDetailComponent } from "./gifts/gift-detail/gift-detail.component";
import { GiftEditComponent } from "./gifts/gift-edit/gift-edit.component";
import { GiftsComponent } from "./gifts/gifts.component";

import { PersonDetailComponent } from "./persons/person-detail/person-detail.component";
import { PersonEditComponent } from "./persons/person-edit/person-edit.component";
import { PersonsComponent } from "./persons/persons.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/people', pathMatch: 'full'},
    { path: 'people', component: PersonsComponent, children: [
        { path: 'new', component: PersonEditComponent},
        { path: ':id', component: PersonDetailComponent},
        { path: ':id/edit', component: PersonEditComponent},
        { path: ':id/add', component: GiftEditComponent},
    ]},
    { path: 'gifts', component: GiftsComponent, children: [
        { path: 'new', component: GiftEditComponent},
        { path: ':id', component: GiftDetailComponent},
        { path: ':id/edit', component: GiftEditComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}