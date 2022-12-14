import { ApiService } from './../shared/api.service';
//import { EmployeeModel } from './employee-dashboard.model';
import { assertPlatform, Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { EmployeeModel } from './models/employee-dashboard.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  searchFlight: any;
  p: number = 1;
  //api: any;
  constructor(private formbuilder: FormBuilder, private api : ApiService){ }

  ngOnInit(): void {
     this.formValue = this.formbuilder.group({
     firstName : ['',Validators.required],
     lastName: ['', Validators.required],
     email: ['', Validators.required],
     mobile: ['', Validators.required],
     salary: ['', Validators.required],
  
  })
  this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  } 

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe (res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
        alert("Something Went Wrong");
       }
     )
      }

      getAllEmployee(){
        this.api.getEmployee().subscribe(res=>{
          this.employeeData = res;
        })
      }

      deleteEmployee(row : any){

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.api.deleteEmployee(row.id).subscribe(res=>{
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            
          }
          this.getAllEmployee();
        })
      }
        
         //this.getAllEmployee();
        // })
     

      onEdit(row : any){
        this.showAdd = false;
        this.showUpdate = true;
        this.employeeModelObj.id = row.id;
        this.formValue.controls['firstName'].setValue(row.firstName);
        this.formValue.controls['lastName'].setValue(row.lastName);
        this.formValue.controls['email'].setValue(row.email);
        this.formValue.controls['mobile'].setValue(row.mobile);
        this.formValue.controls['salary'].setValue(row.salary);
      }

      updateEmployeeDetails(){
        this.employeeModelObj.firstName = this.formValue.value.firstName;
        this.employeeModelObj.lastName = this.formValue.value.lastName;
        this.employeeModelObj.email = this.formValue.value.email;
        this.employeeModelObj.mobile = this.formValue.value.mobile;
        this.employeeModelObj.salary = this.formValue.value.salary;

        this.api.updateEmployee(this.employeeModelObj.id, this.employeeModelObj).subscribe(res=>{
          alert("Updated Successfully");
          
          let ref = document.getElementById('cancle')
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        })
      }

      //---------pagination----------
      keyPressAlphanumeric(event: any) {
        var inp = String.fromCharCode(event.keyCode);
    
        if (/[a-zA-Z0-9]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }



    // .subscribe(res=>{
    //   console.log(res);
    // })
    // .subscribe(res=>{
    //   console.log(res);
    //   alert("Employee Added Successfully");
    // },
    // err=>{
    //   alert("Something Went Wrong");
    // })
  }


