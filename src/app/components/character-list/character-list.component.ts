import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Character } from '../../models/character.model';
import { debounceTime } from 'rxjs/operators';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  filterControl = new FormControl('');
  statusFilter = new FormControl('');
  isGridView = true;
  page = 1;
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCharacters();

    // Handle filtering
    this.filterControl.valueChanges.pipe(debounceTime(300)).subscribe(() => this.resetAndLoad());
    this.statusFilter.valueChanges.subscribe(() => this.resetAndLoad());
  }

  loadCharacters(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    const filterValue = this.filterControl.value ?? undefined;
    const statusValue = this.statusFilter.value ?? undefined;

    this.apiService.getCharacters(this.page, filterValue, statusValue).subscribe(data => {
      this.characters = [...this.characters, ...data];
      this.page++;
      this.isLoading = false;
    });
  }

  resetAndLoad(): void {
    this.characters = [];
    this.page = 1;
    this.loadCharacters();
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !this.isLoading) {
      this.loadCharacters();
    }
  }
}