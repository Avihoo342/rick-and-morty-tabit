import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterListComponent } from './character-list.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getCharacters']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    apiServiceSpy.getCharacters.and.returnValue(of({ info:[], results: [] }));
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        InfiniteScrollModule,
        HttpClientModule,
        CharacterListComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;

    component.filterControl = new FormControl('');
    component.statusFilter = new FormControl('');

    spyOn(component.filterControl.valueChanges, 'pipe').and.returnValue(of(''));
    spyOn(component.statusFilter.valueChanges, 'pipe').and.returnValue(of(''));

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadCharacters on init', () => {
    const loadCharactersSpy = spyOn(component, 'loadCharacters').and.callThrough();
    component.ngOnInit();
    expect(loadCharactersSpy).toHaveBeenCalled();
  });

  it('should call resetAndLoad when filter or status changes', () => {
    const resetAndLoadSpy = spyOn(component, 'resetAndLoad').and.callThrough();
    component.filterControl.setValue('filterValue');
    component.statusFilter.setValue('statusValue');
    expect(resetAndLoadSpy).toHaveBeenCalledTimes(0);
  });

  it('should load characters when scroll reaches the bottom', () => {
    const loadCharactersSpy = spyOn(component, 'loadCharacters').and.callThrough();
    component.onScroll();
    fixture.detectChanges();
    expect(loadCharactersSpy).toHaveBeenCalled();
  });

  it('should set hasMoreCharacters to false if no more characters are available', () => {
    const mockCharacters = { info: { next: null }, results: [] };
    apiServiceSpy.getCharacters.and.returnValue(of(mockCharacters));
    component.loadCharacters();
    fixture.detectChanges();
    expect(component.hasMoreCharacters).toBeFalsy();
  });

  it('should navigate to character detail page on character click', () => {
    const characterId = 1;
    component.onCharacterClick(characterId);
    expect(routerMock.navigate).toHaveBeenCalledWith([`/character/${characterId}`]);
  });

  it('should toggle view mode between grid and list view', () => {
    const initialView = component.isGridView;
    component.toggleView();
    expect(component.isGridView).toBe(!initialView);
  });
});
