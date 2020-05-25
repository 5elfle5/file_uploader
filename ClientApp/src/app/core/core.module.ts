import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FileService } from './services/file.service';
import { FileConstraintsResolver } from './resolvers/file-constraints.resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
  ],
  providers: [
    HttpClient,
    FileService,
    FileConstraintsResolver,
  ]
})
export class CoreModule { }
