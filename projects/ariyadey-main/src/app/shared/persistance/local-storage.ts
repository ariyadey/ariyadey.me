import { DOCUMENT, inject, Injectable } from "@angular/core";
import { PersistKey } from "@main/shared/persistance/persist-key";

@Injectable({
  providedIn: "root",
})
export class LocalStorage {
  private readonly localStorage = inject(DOCUMENT).defaultView!.localStorage;

  get<T>(key: PersistKey): T | null {
    const value = this.localStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  }

  set(key: PersistKey, value: unknown) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }
}
