import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdmfSharedModule } from "../../../../mdmf-shared/src/public-api";

import { DrawRoutingModule } from "./draw-routing.module";
import { DrawComponent } from './components/draw/draw.component';

@NgModule({
  declarations: [DrawComponent],
  imports: [
    CommonModule,
    DrawRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MdmfSharedModule,
  ],
  exports: [DrawComponent]
})
export class DrawModule {}
