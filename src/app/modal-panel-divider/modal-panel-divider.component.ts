import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

// PrimeNg
import { DividerModule } from 'primeng/divider';
import { Menu } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { Avatar } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { RadioButton } from 'primeng/radiobutton';
import { ToggleButton } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-modal-panel-divider',
  standalone: true,
  imports: [
    FormsModule,
    DividerModule,
    Menu,
    BadgeModule,
    Avatar,
    RouterModule,
    IconFieldModule,
    InputIconModule,
    IftaLabelModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    RadioButton,
    ToggleButton,
    ButtonModule,
    AutoFocusModule,
    CheckboxModule,
    JsonPipe,
    PasswordModule,
  ],
  templateUrl: './modal-panel-divider.component.html',
  styleUrl: './modal-panel-divider.component.scss',
})
export class ModalPanelDividerComponent implements OnInit {
  value: string | undefined;
  text1: string | undefined;
  ingredient!: string;
  checked: boolean = false;
  name: string = '';
  email: string = '';
  accept: boolean = false;

  items: MenuItem[] | undefined;
  items2: MenuItem[] | undefined;
  items3: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        separator: true,
      },
      {
        label: 'Documents',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            shortcut: '⌘+N',
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
          },
        ],
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+O',
          },
          {
            label: 'Messages',
            icon: 'pi pi-inbox',
            badge: '2',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q',
          },
        ],
      },
      {
        separator: true,
      },
    ];

    this.items2 = [
      {
        label: 'Navigate',
        items: [
          {
            label: 'Router Link',
            icon: 'pi pi-palette',
            route: '/guides/csslayer',
          },
          {
            label: 'Programmatic',
            icon: 'pi pi-link',
            command: () => {
              this.router.navigate(['/installation']);
            },
          },
          {
            label: 'External',
            icon: 'pi pi-home',
            url: 'https://angular.io//',
          },
        ],
      },
    ];

    this.items3 = [
      { label: 'New', icon: 'pi pi-plus' },
      { label: 'Search', icon: 'pi pi-search' },
    ];
  }

  //#region Template Drive Form
  login(form: NgForm, event: Event) {
    console.log(JSON.stringify(form.value));
  }

  onEmailChange(event: Event) {
    throw new Error('Method not implemented.');
  }
  //#endregion
}
