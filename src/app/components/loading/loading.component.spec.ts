import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { AppState } from 'src/store/AppState'; // Pastikan jalur ini benar
import { hide, show } from 'src/store/loading/loading.actions'; // Pastikan jalur ini benar

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>; // Inisialisasi store

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot({}), // Kosongkan root state
        StoreModule.forFeature('loading', loadingReducer) // Masukkan reducer untuk feature 'loading'
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.inject(Store); // Gunakan TestBed.inject alih-alih TestBed.get

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should hide loading component when it is not loading', () => {
    const compiled = fixture.nativeElement;

    store.dispatch(hide()); // Dispatch action hide
    fixture.detectChanges();

    expect(compiled.querySelector('.backdrop')).toBeNull(); // Verifikasi elemen backdrop tidak ada
  });

  it('should show loading component when it is loading', () => {
    const compiled = fixture.nativeElement;

    store.dispatch(show()); // Dispatch action show
    fixture.detectChanges();

    expect(compiled.querySelector('.backdrop')).not.toBeNull(); // Verifikasi elemen backdrop ada
  });
});
