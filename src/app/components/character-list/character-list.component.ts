import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Character } from '../../models/character.model';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MaterialModule } from '../../material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { merge, of, Subscription } from 'rxjs';
import {
  TOOLBAR_LABELS,
  CHARACTER_STATUSES,
  STATUS_MESSAGES,
  INFINITE_SCROLL_SETTINGS,
  TABLE_COLUMNS
} from '../../consts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    InfiniteScrollModule,
    HttpClientModule
  ],
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  filterControl = new FormControl('');
  statusFilter = new FormControl('');
  isGridView = true;
  page = 1;
  isLoading = false;
  hasMoreCharacters = true;
  private filterSubscription: Subscription | null = null;

  public TOOLBAR_LABELS = TOOLBAR_LABELS;
  public CHARACTER_STATUSES = CHARACTER_STATUSES;
  public STATUS_MESSAGES = STATUS_MESSAGES;
  public INFINITE_SCROLL_SETTINGS = INFINITE_SCROLL_SETTINGS;
  public TABLE_COLUMNS = TABLE_COLUMNS;

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !this.isLoading) {
      this.loadCharacters();
    }
  }

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.startFilterListeners();
    this.loadCharacters();
  }

  ngOnDestroy(): void {
    this.filterSubscription?.unsubscribe();
  }

  startFilterListeners(): void {
    this.filterSubscription = merge(
      this.filterControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
      this.statusFilter.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
    ).subscribe(() => {
      this.resetAndLoad();
    });
  }

  loadCharacters(): void {
    if (this.isLoading || !this.hasMoreCharacters) return;

    this.isLoading = true;

    const filterValue = this.filterControl.value ?? undefined;
    const statusValue = this.statusFilter.value ?? undefined;

    this.apiService.getCharacters(this.page, filterValue, statusValue)
      .pipe(
        catchError(err => {
          if (err.status === 404) {
            console.warn('No characters found for the given filter.');
            this.hasMoreCharacters = false;
          } else {
            this.showErrorMessage();
          }
          return of(null);
        })
      )
      .subscribe(data => {
        if (data && data.results) {
          this.characters = [...this.characters, ...data.results];
          this.page++;
          this.hasMoreCharacters = !!data.info.next;
        } else {
          this.hasMoreCharacters = false;
        }
        this.isLoading = false;
      });
  }

  resetAndLoad(): void {
    this.characters = [];
    this.page = 1;
    this.hasMoreCharacters = true;
    this.loadCharacters();
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  onCharacterClick(id: number): void {
    this.router.navigate([`/character/${id}`]);
  }

  navigateToEpisode(): void {
    this.router.navigate([`/episodes`]);
  }
  
  showErrorMessage(): void {
    console.error('An unexpected error occurred.');
  }
}
