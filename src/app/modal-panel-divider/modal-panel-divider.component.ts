import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';

import { Menu } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { Avatar } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-modal-panel-divider',
  standalone: true,
  imports: [DividerModule, Menu, BadgeModule, Avatar],
  templateUrl: './modal-panel-divider.component.html',
  styleUrl: './modal-panel-divider.component.scss',
})
export class ModalPanelDividerComponent implements OnInit {
  items: MenuItem[] | undefined;

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
  }
}
