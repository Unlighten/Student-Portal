import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class NavbarService {
  visible = new Subject<boolean>();

  constructor() {
    // this.visible = true;
  }

  hide() {
    this.visible.next(false);
  }

  show() {
    this.visible.next(true);
  }
}