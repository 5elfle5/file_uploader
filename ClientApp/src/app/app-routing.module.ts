import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileConstraintsResolver } from './core/resolvers/file-constraints.resolver';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'upload',
    component: FileUploaderComponent,
    resolve: { fileConstraints: FileConstraintsResolver },
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'upload'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
