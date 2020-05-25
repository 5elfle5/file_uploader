import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile = (files: File[], validateFn: (file: File) => boolean) => {
    const formData = new FormData();
    let count = 0;
    for (let i = 0; i < files.length; i++) {
      const fileToUpload = files[i];
      if (validateFn(fileToUpload)) {
        formData.append('file', fileToUpload, fileToUpload.name);
        count++;
      }
    }
    if (count === 0){
      return throwError({error: 'No valid files to upload.'});
    }
    return this.http.post('/api/files', formData);
  }

  getFileConstraints() {
    return this.http.get('/api/files/constraints');
  }
}
