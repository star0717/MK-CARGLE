import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class MaintenancesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');

    var args = context.getArgs();
    console.log('keys: ', args.values());
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
