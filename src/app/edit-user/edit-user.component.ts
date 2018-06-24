import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  userId: string;
  id = '';
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
     this.userId  = localStorage.getItem('editUserId');
   // const iduse =  localStorage.getItem('editUserId');

    if (!this.userId) {
      alert('Invalid action.');
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.userService.getUserById(this.userId)
      .subscribe(data => {
        console.log(data);
        this.editForm.setValue({
          _id: data._id,
          nombre: data.nombre,
          email: data.email,
          estado: data.estado,
        });

      });
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

}
