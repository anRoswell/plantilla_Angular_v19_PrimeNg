import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { Dialog } from 'primeng/dialog';
import { Editor } from 'primeng/editor';

// IFrame
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CodeEditorComponent } from './code-editor/code-editor.component';

// PdfViewer
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { HttpClient } from '@angular/common/http';

// Alert
import Swal from 'sweetalert2';

// Visor
import { NgxDocViewerModule } from 'ngx-doc-viewer'; // Importa el módulo
import { ModalPanelDividerComponent } from './modal-panel-divider/modal-panel-divider.component';
import { DynamicForm02Component } from './dynamic-form02/dynamic-form02.component';
import { TableGenericComponent } from './shared/components/general/table-generic/table-generic.component';
import { ITable, TypeColumn, TypeFormat } from './models/general/ITable';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    // CodeEditorComponent,
    // PdfViewerComponent,
    // Dialog,
    // Editor,
    FormsModule,
    // ModalPanelDividerComponent,
    NgxDocViewerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'Inviare v2.0';
  public sanitizedUrl;
  public visible: boolean = false;
  public panelDivide: boolean = false;
  public response: string = '';
  public text: string | undefined;
  public documentUrl: string;

  constructor(
    private primeng: PrimeNG,
    private domSanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {
    this.primeng.theme.set({
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });

    this.sanitizedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      'https://syspotec.com'
    );

    // this.documentUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
    //   'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'
    // );

    this.documentUrl =
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }

  showDialog() {
    this.visible = true;
  }

  showSweetAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  }

  showModalPanelDivder() {
    this.panelDivide = true;
  }
}
