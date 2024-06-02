import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-file-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './upload-file-dialog.component.html',
  styleUrl: './upload-file-dialog.component.scss'
})
export class UploadFileDialogComponent {
  file: File | any; // Variable to store file
  isLoadingResults: boolean = false;

  constructor(    
    public dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accept: string },
  ) { }

  // On file Select 
  onChange(event : any) { 
    this.file = event.target.files[0]; 
  }

  // OnClick of button Cancel
  close(): void {
    this.dialogRef.close();
  }

  // OnClick of button Upload 
  async validate(): Promise<any> {
    this.dialogRef.close(this.file);
  }
}
