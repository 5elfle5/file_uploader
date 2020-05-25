import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FileConstraints } from '../models/file-constraints';
import { FileService } from '../services/file.service';

@Injectable()
export class FileConstraintsResolver implements Resolve<any> {

  constructor(private fileService: FileService) { }

  resolve() {
    return this.fileService.getFileConstraints();
  }
}
