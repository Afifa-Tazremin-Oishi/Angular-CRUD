import { ApiService } from './../shared/api.service';
//import { EmployeeModel } from './employee-dashboard.model';
import { assertPlatform, Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
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
  //api: any;
  constructor(private formbuilder: FormBuilder, private api : ApiService){ }

  ngOnInit(): void {
     this.formValue = this.formbuilder.group({
     firstName : [''],
     lastName: [''],
     email: [''],
     mobile: [''],
     salary: [''],
  
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
        this.api.deleteEmployee(row.id).subscribe(res=>{
          alert("Employee Deleted");
        //   const Swal = require('sweetalert2')
        //   Swal.fire({
        //     title: 'Do you want to save the changes?',
        //     showDenyButton: true,
        //     showCancelButton: true,
        //     confirmButtonText: 'Save',
        //     denyButtonText: `Don't save`,
        //   }).then((res) => {
        //     /* Read more about isConfirmed, isDenied below */
        //     if (res.isConfirmed) {
        //       Swal.fire('Saved!', '', 'success')
        //     } else if (res.isDenied) {
        //       Swal.fire('Changes are not saved', '', 'info')
        //     }
        //   })
         this.getAllEmployee();
        })
      }

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


