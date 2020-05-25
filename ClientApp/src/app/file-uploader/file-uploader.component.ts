import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileConstraints } from '../core/models/file-constraints';
import { FileService } from '../core/services/file.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../core/models/message';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  fileConstraints: FileConstraints;
  progress: number;
  message: string;

  @Output() public onUploadFinished = new EventEmitter();
 
  constructor(private fileService: FileService,
      private route: ActivatedRoute,
    ) { }
 
  ngOnInit() {
    this.fileConstraints = this.route.snapshot.data.fileConstraints as FileConstraints;
  }
 
  uploadFile = (files: File[]) => {
    this.fileService.uploadFile(files, this.validateFile)
      .subscribe(data => {
        this.message = (data as Message).message;
      });
      
  }
  
  validateFile = (file: File) => {
    const extension = file.name.split('.').pop();
    if (!this.fileConstraints.extensions.includes(extension)){
      this.message = `.${extension} extension is not allowed.`;
      return false;
    }      
    
    if (file.size > this.fileConstraints.maximumSizeBytes) {
      this.message = `File ${file.name} is bigger than ${this.fileConstraints.maximumSizeBytes / (1024 * 1024)} Mb.`;
      return false;
    }

    return true;
  }
}
