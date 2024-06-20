import { inject, Injectable } from "@angular/core";
import { PersistKey } from "@main/shared/persistance/persist-key";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private readonly localStorage = inject(Window).localStorage;

  get(key: PersistKey): unknown {
    const value = this.localStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  }

  set(key: PersistKey, value: unknown) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }
}
