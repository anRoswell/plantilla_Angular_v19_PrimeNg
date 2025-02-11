import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { Dialog } from 'primeng/dialog';
import { Editor } from 'primeng/editor';

// IFrame
import { DomSanitizer } from '@angular/platform-browser';
import { CodeEditorComponent } from './code-editor/code-editor.component';

// PdfViewer
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { HttpClient } from '@angular/common/http';

// Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    CodeEditorComponent,
    PdfViewerComponent,
    Dialog,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'Inviare v2.0';
  public sanitizedUrl;
  public visible: boolean = false;
  public response: string = '';

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
  }

  ngOnInit() {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        this.response = JSON.stringify(data);
      });
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
}
