import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Episode } from '../../models/episode.model';
import { Character } from '../../models/character.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { STATUS_MESSAGES } from '../../consts';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule]
})
export class EpisodeListComponent implements OnInit {
  episodes: Episode[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  public STATUS_MESSAGES = STATUS_MESSAGES;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.loading = true;
    this.apiService.getEpisodes().subscribe((data) => {
      this.episodes = this.shuffleArray(data.results);
      this.loading = false;
    });
  }

  onSearchChange(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.apiService.searchCharactersByName(this.searchQuery).subscribe((characters) => {
        this.episodes = this.filterEpisodesByCharacters(characters);
        this.loading = false;
      });
    } else {
      this.getEpisodes();
    }
  }

  filterEpisodesByCharacters(characters: Character[]): Episode[] {
    return this.episodes.filter((episode) => {
      return episode.characters.some((characterUrl) =>
        characters.some((character) => character.url === characterUrl)
      );
    });
  }

  shuffleArray(array: Episode[]): Episode[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
