import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  title: string;
  message: string;
  dialogType: DialogType;
  sanitizedText: SafeHtml = '';

  constructor(
    private domSanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogModel
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.dialogType = data.dialogType;
  }

  ngOnInit() {
    this.sanitizedText = this.domSanitizer.bypassSecurityTrustHtml(
      this.message
    );
  }
}

/**
 * Class to represent alert dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class AlertDialogModel {
  constructor(public title: string, public message: string, public dialogType: DialogType) {}
}

export enum DialogType {
  success = 'SUCCESS',
  warning = 'WARNING',
  error = 'ERROR',
  expired = 'EXPIRED'
}