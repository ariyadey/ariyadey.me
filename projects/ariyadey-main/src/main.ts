import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "@main/app.config";
import { AppComponent } from "@main/app.component";

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
