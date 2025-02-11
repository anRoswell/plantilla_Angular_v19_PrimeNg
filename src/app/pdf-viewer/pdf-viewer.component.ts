import { Component } from '@angular/core';

// PdfViewer
import { PdfViewerModule } from 'ng2-pdf-viewer'; // Importa el módulo

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  pdfSrc: string =
    'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'; // URL del archivo PDF
  page: number = 1; // Página inicial
  totalPages: number = 0; // Total de páginas
  isLoaded: boolean = false; // Estado de carga

  // Método para manejar el evento cuando el PDF se carga correctamente
  onLoadComplete(pdf: any) {
    this.totalPages = pdf.numPages;
    this.isLoaded = true;
  }
}
