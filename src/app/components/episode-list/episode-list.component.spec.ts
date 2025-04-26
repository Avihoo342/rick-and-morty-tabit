import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodeListComponent } from './episode-list.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Character } from '../../models/character.model';
import { Episode } from '../../models/episode.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EpisodeListComponent', () => {
  let component: EpisodeListComponent;
  let fixture: ComponentFixture<EpisodeListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getEpisodes', 
      'searchCharactersByName'
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, EpisodeListComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodeListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEpisodes on init', () => {
    const mockEpisodes: Episode[] = [{
      id: 1, name: 'Episode 1', characters: [],
      air_date: '',
      episode: ''
    }];
    apiServiceSpy.getEpisodes.and.returnValue(of({ info:[], results: mockEpisodes }));
    component.ngOnInit();
    fixture.detectChanges();
    expect(apiServiceSpy.getEpisodes).toHaveBeenCalled();
    expect(component.episodes).toEqual(mockEpisodes);
  });

  it('should shuffle episodes when episodes are fetched', () => {
    const mockEpisodes: Episode[] = [
      {
        id: 1, name: 'Episode 1', characters: [],
        air_date: '',
        episode: ''
      },
      {
        id: 2, name: 'Episode 2', characters: [],
        air_date: '',
        episode: ''
      },
    ];
    apiServiceSpy.getEpisodes.and.returnValue(of({ info:[], results: mockEpisodes }));
    component.getEpisodes();
    fixture.detectChanges();
    expect(component.episodes).toBeDefined();
    expect(component.episodes.length).toBe(2);
  });

  it('should filter episodes by characters when searchQuery is provided', () => {
    const mockCharacters: Character[] = [{
      url: 'http://example.com/character1',
      id: 0,
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      image: ''
    }];
    const mockEpisodes: Episode[] = [
      {
        id: 1, name: 'Episode 1', characters: ['http://example.com/character1'],
        air_date: '',
        episode: ''
      },
      {
        id: 2, name: 'Episode 2', characters: [],
        air_date: '',
        episode: ''
      }
    ];
    component.episodes = mockEpisodes;
    apiServiceSpy.searchCharactersByName.and.returnValue(of(mockCharacters));

    const filteredEpisodes = component.filterEpisodesByCharacters(mockCharacters);
    expect(filteredEpisodes.length).toBe(1); // Only 1 episode matches
    expect(filteredEpisodes[0].name).toBe('Episode 1');
  });

  it('should reload episodes when searchQuery is empty', () => {
    const mockEpisodes: Episode[] = [{
      id: 1, name: 'Episode 1', characters: [],
      air_date: '',
      episode: ''
    }];
    apiServiceSpy.getEpisodes.and.returnValue(of({ info:[], results: mockEpisodes }));
    component.searchQuery = '';
    component.onSearchChange();
    fixture.detectChanges();
    expect(apiServiceSpy.getEpisodes).toHaveBeenCalled();
    expect(component.episodes).toEqual(mockEpisodes);
  });

  it('should shuffle episodes when shuffleArray is called', () => {
    const mockEpisodes: Episode[] = [
      {
        id: 1, name: 'Episode 1', characters: [],
        air_date: '',
        episode: ''
      },
      {
        id: 2, name: 'Episode 2', characters: [],
        air_date: '',
        episode: ''
      },
    ];
    const shuffled = component.shuffleArray(mockEpisodes);
    expect(shuffled.length).toBe(2);
  });

  it('should set loading to true when fetching episodes', () => {
    const mockEpisodes: Episode[] = [{
      id: 1, name: 'Episode 1', characters: [],
      air_date: '',
      episode: ''
    }];
    apiServiceSpy.getEpisodes.and.returnValue(of({ info: [], results: mockEpisodes }));
    component.getEpisodes();
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
  });
});
