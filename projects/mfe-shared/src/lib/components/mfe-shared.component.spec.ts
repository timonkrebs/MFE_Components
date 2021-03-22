import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MfeSharedComponent } from "./mfe-shared.component";

describe("mfeSharedComponent", () => {
  let component: MfeSharedComponent;
  let fixture: ComponentFixture<MfeSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MfeSharedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfeSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the shared component", () => {
    expect(component).toBeTruthy();
  });

  it("should render h2 element", () => {
    const element = fixture.debugElement.nativeElement.querySelector("h2");
    expect(element.textContent).toContain("Component from shared module");
  });
});
