import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdduserService } from './add-user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Output() addUserFormSubmitted = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder, private adduserService: AdduserService) { }

  addUserForm: FormGroup;

  customername = '';
  customeremail = '';
  customerphone = '';
  customerid = '';

  ngOnInit(): void {
    this.addUserForm  =  this.formBuilder.group({
      customername: ['', Validators.required],
      customeremail: ['', [Validators.required,Validators.email]],
      customerphone: ['', Validators.required],
      customerid: ['', Validators.required],
  });
  }

  get formControls() {
    return this.addUserForm.controls;
  }

  onSubmit(){
    this.adduserService.adduser(this.addUserForm.value);
    this.addUserForm.reset();
    this.addUserFormSubmitted.emit(true);
}

onCancel() {
  this.addUserForm.reset();
  this.addUserFormSubmitted.emit(true);
}
}
