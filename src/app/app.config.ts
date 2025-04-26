import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '',  loadComponent: () => import('./components/character-list/character-list.component')
    .then(main => main.CharacterListComponent) },
  { 
    path: 'character/:id', loadComponent: () => import('./components/character-detail/character-detail.component')
    .then(characterDetails => characterDetails.CharacterDetailComponent)
  },
  { 
    path: 'episodes', loadComponent: () => import('./components/episode-list/episode-list.component')
    .then(episode => episode.EpisodeListComponent)
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
  ],
};

