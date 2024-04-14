import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../Model/Customer';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private router: Router, private masterService: MasterService) { 
    this.username = "";
    this.password = "";
  }

  login(): void {
    if (this.username !== '' && this.password !== '') {
      this.router.navigate(['/']);
      this.masterService.GetCustomerbycode(this.username).subscribe(
        (customer: Customer) => {
          localStorage.setItem('currentUser', JSON.stringify(customer));
        },
        (error) => {
          // Handle error response from the backend
          console.error('Error fetching customer:', error);
        }
      );
    }
  }  
}
