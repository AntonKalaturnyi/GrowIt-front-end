import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() { }

  registeredUserPermission(): boolean {
    if (localStorage.getItem('REGISTERED_USER')) {
      return true;
    } else {
    return false;
    }
  }
}
