import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DialogType } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  confirmButtonLabel: string;
  dialogType: DialogType;
  sanitizedText: SafeHtml = '';

  constructor(
    private domSanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.confirmButtonLabel = data.confirmButtonLabel;
    this.dialogType = data.dialogType;
  }

  ngOnInit() {
    this.sanitizedText = this.domSanitizer.bypassSecurityTrustHtml(
      this.message
    );
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {
  constructor(public title: string, public message: string, public confirmButtonLabel: string, public dialogType: DialogType) {}
}

