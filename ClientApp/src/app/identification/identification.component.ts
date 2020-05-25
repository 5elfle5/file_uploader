import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent {
  addressForm = this.fb.group({
    firstName: [null, Validators.required]
  });

  hasUnitNumber = false;


  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
