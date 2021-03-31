import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ShellModule } from "./shell/shell.module";
import { AppComponent } from "./app.component";
import { APP_ROUTES } from "./app.routes";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { MfeSharedModule } from "projects/mfe-shared/src/lib/modules/mfe-shared.module";
import { NgxsModule } from "@ngxs/store";
import { ImageState } from "projects/mfe-shared/src/lib/app-state/state/image.state";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    NgxsModule.forRoot([ImageState]),
    MfeSharedModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ShellModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
