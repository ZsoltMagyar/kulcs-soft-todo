import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if(error.status === 500) {
          this.openSnackbar('500! Internal server error!', 'error');
        } else if (error.status === 404) {
          this.openSnackbar('404! The requested Todo is not found!.', 'warn');
        }
      }
      return throwError(error);
    }))
  }

  private openSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, null, {duration: 5000, verticalPosition: 'top', panelClass})
  }
}
