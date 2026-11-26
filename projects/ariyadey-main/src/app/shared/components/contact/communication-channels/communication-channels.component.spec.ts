import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommunicationChannelsComponent } from "@main/shared/components/contact/communication-channels/communication-channels.component";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("CommunicationChannelsComponent", () => {
  let component: CommunicationChannelsComponent;
  let fixture: ComponentFixture<CommunicationChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationChannelsComponent],
      providers: [provideAppTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
