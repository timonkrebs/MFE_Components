import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef, ɵcreateInjector } from "@angular/core";
import { loadRemoteModule, LoadRemoteModuleOptions } from "../../../utils/federation-utils";
@Component({
  selector: "federated-component",
  templateUrl: "./federated.component.html",
  styleUrls: ["./federated.component.scss"],
})
export class FederatedComponent implements OnInit {
  @ViewChild('federatedComponent', { read: ViewContainerRef }) federatedComponent: ViewContainerRef;
  @Input() remoteEntry: string;
  @Input() remoteName: string;
  @Input() exposedModule: string;
  @Input() componentName: string;

  constructor(private injector: Injector, private cfr: ComponentFactoryResolver) { }
  ngOnInit(): void {
    loadRemoteModule({
      remoteEntry: this.remoteEntry,
      remoteName: this.remoteName,
      exposedModule: this.exposedModule,
    }).then(profileListUserComponent => {
      console.log(profileListUserComponent)
      const componentFactory = this.cfr.resolveComponentFactory(profileListUserComponent.ProfileModule.ɵmod.exports.find((e) => e.name === this.componentName));
      const { instance } = this.federatedComponent.createComponent(componentFactory, null, ɵcreateInjector(profileListUserComponent.ProfileModule, this.injector));
    });
  }
}