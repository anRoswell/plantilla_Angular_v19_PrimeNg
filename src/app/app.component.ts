import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { Dialog } from 'primeng/dialog';

// IFrame
import { DomSanitizer } from '@angular/platform-browser';
import { CodeEditorComponent } from './code-editor/code-editor.component';

// PdfViewer
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

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
export class AppComponent {
  public title = 'Inviare v2.0';
  public sanitizedUrl;
  public visible: boolean = false;

  constructor(private primeng: PrimeNG, private domSanitizer: DomSanitizer) {
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

  showDialog() {
    this.visible = true;
  }
}
