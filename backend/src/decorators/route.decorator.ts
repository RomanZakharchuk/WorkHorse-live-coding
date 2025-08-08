
import { Service } from 'typedi';

export function Route() {
   return function (target: any) {
      Service()(target);
      Reflect.defineMetadata('Route', true, target);
   };
}
