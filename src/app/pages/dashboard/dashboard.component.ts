import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { merge, startWith, switchMap, map } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../users/users.service';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UploadFileDialogComponent } from '../../components/upload-file-dialog/upload-file-dialog.component';
import { AlertDialogComponent, AlertDialogModel, DialogType } from '../../components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, RouterModule, MatIconModule, MatTooltipModule,
    MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatTableModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatDialogModule, MatTooltipModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  usersService = inject(UsersService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  form!: FormGroup;
  displayedColumns: string[] = ['fullname', 'email', 'company', 'status', 'actions']
  dataSource: MatTableDataSource<User> = new MatTableDataSource<any>([]);
  users: User[] = [];
  resultsLength: number | undefined = undefined;
  url: any = '';

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.usersService.getUsers();
        }),
        map((data) => {
          if (data === null) {
            return [];
          }
          this.resultsLength = data.length;
          return data;
        })
      )
      .subscribe((data) => {
        this.users = data;
      });
  }
  archiveUser(row: User) {

  }
  openEditInternalUserDialog(user: any) { }
  async openImportDialog() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      disableClose: true,
      width: "500px",
      data: {
        accept: ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      },
    });
    dialogRef.afterClosed().subscribe(async file => {
      if (file) {
        this.usersService.importUsers(file).subscribe({
          next: (res) => {
            let msg = '';
            for (let message of res.messages) {
              msg += '- ' + message + '<br>'
            }
            const dialogData = new AlertDialogModel(
              res.status == "success" ? "Données importées avec succès" : "Echec d'importation des données",
              msg,
              res.status == "success" ? DialogType.success : DialogType.error
            );
            this.dialog.open(AlertDialogComponent, {
              disableClose: true,
              data: dialogData,
              autoFocus: false
            });

            if (res.status == 'success') {
              this.getUsersList();
            }
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }

}