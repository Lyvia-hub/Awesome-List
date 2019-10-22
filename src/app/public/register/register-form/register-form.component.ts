import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'al-register-form',
  templateUrl: './register-form.component.html',
  styles: []
})
export class RegisterFormComponent implements OnInit {

  // definition of the reactive form
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({ // .group => instantiation a new FormGroup
      name: '',
      email: '',
      password: ''
    });
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  submit() {
    // display 'name' value
    // tslint:disable-next-line: no-console
    console.info(this.name.value); // console.info(this.registerForm.get('name').value);
    // display 'email' value
    // tslint:disable-next-line: no-console
    console.info(this.email.value);
    // display 'password' value
    // tslint:disable-next-line: no-console
    console.info(this.password.value);
    this.router.navigate(['/app/dashboard']);
  }
}
