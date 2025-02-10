import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { angular } from '@codemirror/lang-angular';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
})
export class CodeEditorComponent implements AfterViewInit {
  @ViewChild('editor', { static: true }) editorRef!: ElementRef;

  ngAfterViewInit() {
    let language = new Compartment(),
      tabSize = new Compartment();

    let state = EditorState.create({
      doc: `<div>{{ message }}</div>
<html>  
<head>    
    <title>Ejemplo de atributo Href</title>  
</head>  
<body>    
    <h1>Ejemplo de atributo Href</h1>    
    <p><a href="https://www.freecodecamp.org/contribute/">La pagina de de contribucion de freeCodeCamp</a> te muestra como y donde puedes contribuir a la comunidad y al crecimiento de freeCodeCamp.    </p>  
</body>
</html>`, // Initial content
      extensions: [
        basicSetup,
        tabSize.of(EditorState.tabSize.of(8)),
        angular(), // Enable Angular language support
      ],
    });

    const editor = new EditorView({
      state: state,
      parent: this.editorRef.nativeElement,
    });
  }
}
