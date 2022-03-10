import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

describe('test', () => {
  it('should test set', () => {
    const result: Array<{ packageName: string }> = [
      { packageName: 'test' },
      { packageName: 'test' },
      { packageName: 'test2' }
    ];

    const set = new Map<string, { [key: string]: string }>(
      result
        .map((el) => ({ packageName: el.packageName }))
        .map((el) => [el.packageName, el])
    );
    expect(set.size).toBe(2);
  });
});
