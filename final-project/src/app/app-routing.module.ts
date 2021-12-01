import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GiftDetailComponent } from "./gifts/gift-detail/gift-detail.component";
import { GiftEditComponent } from "./gifts/gift-edit/gift-edit.component";
import { GiftsComponent } from "./gifts/gifts.component";

import { PeopleDetailComponent } from "./people/people-detail/people-detail.component";
import { PeopleEditComponent } from "./people/people-edit/people-edit.component";
import { PeopleComponent } from "./people/people.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/people', pathMatch: 'full'},
    { path: 'people', component: PeopleComponent, children: [
        { path: 'new', component: PeopleEditComponent},
        { path: ':id', component: PeopleDetailComponent},
        { path: ':id/edit', component: PeopleEditComponent}
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