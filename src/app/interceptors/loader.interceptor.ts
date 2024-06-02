import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  var totalRequests = 0;
  var requestsCompleted = 0;
  var loaderService = inject(LoaderService);
  loaderService.show();
  totalRequests++;
  return next(req).pipe(
    finalize(() => {
      requestsCompleted++;
      if (requestsCompleted === totalRequests) {
        loaderService.hide();
        totalRequests = 0;
        requestsCompleted = 0;
      }
    })
  );
};

