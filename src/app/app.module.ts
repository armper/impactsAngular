import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ImpactDetailComponent }  from './impact-detail/impact-detail.component';
import { ImpactsComponent }      from './impacts/impacts.component';
import { ImpactSearchComponent }  from './impact-search/impact-search.component';
import { ImpactService }          from './impact.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { ImpactEditorComponent } from './impacts/editor/impact.editor.component';
import { ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  imports: [
  BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ImpactsComponent,
    ImpactDetailComponent,
    MessagesComponent,
    ImpactSearchComponent,
    ImpactEditorComponent
  ],
  providers: [ ImpactService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
