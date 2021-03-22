import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ShellModule } from "./shell/shell.module";
import { AppComponent } from "./app.component";
import { APP_ROUTES } from "./app.routes";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { MdmfSharedModule } from "projects/mdmf-shared/src/lib/modules/mdmf-shared.module";
import { NgxsModule } from "@ngxs/store";
import { UserState } from "projects/mdmf-shared/src/lib/app-state/state/user.state";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    NgxsModule.forRoot([UserState]),
    MdmfSharedModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ShellModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
