import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CharacterDetailComponent } from './character-detail.component';
import { ApiService } from '../../services/api.service';
import { Character } from '../../models/character.model';
import { ActivatedRoute } from '@angular/router';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getCharacterById']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      paramMap: of({
        get: (key: string) => (key === 'id' ? '1' : null),
      }),
    });

    await TestBed.configureTestingModule({
      imports: [CharacterDetailComponent],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCharacterById on ApiService and set character$ observable', () => {
    const mockCharacter: Character = {
      id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive',
      type: '',
      gender: '',
      image: '',
      url: 'aaa'
    };
    apiServiceSpy.getCharacterById.and.returnValue(of(mockCharacter));
    component.ngOnInit();
    component.character$.subscribe((character) => {
      expect(character).toEqual(mockCharacter);
    });
  });

  it('should handle route parameters correctly', () => {
    const mockCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive',
      type: '',
      gender: '',
      image: '',
      url: 'aaa',
    };

    apiServiceSpy.getCharacterById.and.returnValue(of(mockCharacter));
    component.ngOnInit();
    component.character$.subscribe((character) => {
      expect(character).toEqual(mockCharacter); 
    });
  });
});
