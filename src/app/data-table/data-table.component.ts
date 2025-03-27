// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { ButtonModule } from 'primeng/button';
// import { DropdownModule } from 'primeng/dropdown';
// import { IconField } from 'primeng/iconfield';
// import { InputIcon } from 'primeng/inputicon';
// import { InputTextModule } from 'primeng/inputtext';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { TableModule } from 'primeng/table';

// @Component({
//   selector: 'app-data-table',
//   standalone: true,
//   imports: [
//     TableModule,
//     ButtonModule,
//     IconField,
//     InputIcon,
//     CommonModule,
//     MultiSelectModule,
//     InputTextModule,
//     DropdownModule,
//     // Slider,
//     // ProgressBar
//   ],
//   templateUrl: './data-table.component.html',
//   styleUrl: './data-table.component.scss',
// })
// export class DataTableComponent {
//   customers!: Customer[];

//   selectedCustomers!: Customer[];

//   representatives!: Representative[];

//   statuses!: any[];

//   loading: boolean = true;

//   activityValues: number[] = [0, 100];

//   constructor(private customerService: CustomerService) {}

//   ngOnInit() {
//     this.customerService.getCustomersLarge().then((customers: any) => {
//       this.customers = customers;
//       this.loading = false;

//       this.customers.forEach(
//         (customer) => (customer.date = new Date(<Date>customer.date))
//       );
//     });

//     this.representatives = [
//       { name: 'Amy Elsner', image: 'amyelsner.png' },
//       { name: 'Anna Fali', image: 'annafali.png' },
//       { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
//       { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
//       { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
//       { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
//       { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
//       { name: 'Onyama Limba', image: 'onyamalimba.png' },
//       { name: 'Stephen Shaw', image: 'stephenshaw.png' },
//       { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
//     ];

//     this.statuses = [
//       { label: 'Unqualified', value: 'unqualified' },
//       { label: 'Qualified', value: 'qualified' },
//       { label: 'New', value: 'new' },
//       { label: 'Negotiation', value: 'negotiation' },
//       { label: 'Renewal', value: 'renewal' },
//       { label: 'Proposal', value: 'proposal' },
//     ];
//   }

//   getSeverity(status: string) {
//     switch (status) {
//       case 'unqualified':
//         return 'danger';

//       case 'qualified':
//         return 'success';

//       case 'new':
//         return 'info';

//       case 'negotiation':
//         return 'warn';

//       case 'renewal':
//         return null;
//     }
//   }
// }
