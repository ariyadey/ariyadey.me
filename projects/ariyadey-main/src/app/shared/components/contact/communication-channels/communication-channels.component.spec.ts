import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommunicationChannelsComponent } from "ariyadey-main/src/app/shared/components/contact/communication-channels/communication-channels.component";

describe("CommunicationChannelsComponent", () => {
  let component: CommunicationChannelsComponent;
  let fixture: ComponentFixture<CommunicationChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationChannelsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
