import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { ProfileRoutingModule } from "./shell-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { FederatedComponent } from "./components/federated/federated.component";
import { MfeSharedModule } from "projects/mfe-shared/src/lib/modules/mfe-shared.module";

@NgModule({
  declarations: [HomeComponent, FederatedComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ProfileRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MfeSharedModule,
  ],
})
export class ShellModule {}
