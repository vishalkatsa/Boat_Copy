import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private Mytoggle = new BehaviorSubject<boolean>(false);
  private myArray: any[] = [];

  private addressNewSubject = new BehaviorSubject<boolean>(false);
  addressNew$: Observable<boolean> = this.addressNewSubject.asObservable();
 
  ////
  
  getAddressNew(): boolean {
    return this.addressNewSubject.value;
  }

  setAddressNew(value: boolean): void {
    this.addressNewSubject.next(value);
  }
  constructor() { console.log(this.addressNewSubject);
  }
  
  ///


  currntvalue = this.Mytoggle.asObservable();
  getMyArray(): any[] {
    return this.myArray;
  }


  ChangeMytoggle(data: boolean) {
    this.Mytoggle.next(data);
  }

  updateMyArray(newArray: any[]): void {
    this.myArray = newArray;
    console.log(typeof this.myArray);
  }

  
}
