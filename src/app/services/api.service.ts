import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { Character } from '../models/character.model';
import { Episode, EpisodeResponse } from '../models/episode.model';
import { API_ENDPOINTS, CACHE_EXPIRATION_TIME, CHARACTER_STATUSES, STATUS_MESSAGES } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getCharacters(page: number, name?: string, status?: string): Observable<{ info: any; results: Character[] }> {
    const statusForCache = status && status !== CHARACTER_STATUSES[3] ? status : '';
    const cacheKey = `characters_${page}_${name || ''}_${statusForCache || ''}`;
    const cachedData = this.cacheService.get<{ info: any; results: Character[] }>(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    let query = `${API_ENDPOINTS.CHARACTERS}?page=${page}`;
    if (name) query += `&name=${name}`;
    if (status&& status !== CHARACTER_STATUSES[3]) query += `&status=${status}`;

    return this.http.get<{ info: any; results: Character[] }>(query).pipe(
      tap((data) => this.cacheService.set(cacheKey, data))
    );
  }

  getCharacterById(id: number): Observable<Character> {
    const cacheKey = `character_${id}`;
    const cachedData = this.cacheService.get<Character>(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    const query = `${API_ENDPOINTS.CHARACTERS}/${id}`;
    return this.http.get<Character>(query).pipe(
      tap((data) => this.cacheService.set(cacheKey, data))
    );
  }

  getEpisodes(): Observable<EpisodeResponse> {
    const cacheKey = 'episodes';
    const cachedData = this.cacheService.get<EpisodeResponse>(cacheKey);
  
    if (cachedData) {
      return of(cachedData);
    }
  
    const query = API_ENDPOINTS.EPISODES;
    return this.http.get<EpisodeResponse>(query).pipe( 
      tap((data) => this.cacheService.set(cacheKey, data))
    );
  }

  searchCharactersByName(name: string): Observable<Character[]> {
    const query = `${API_ENDPOINTS.CHARACTERS}?name=${name}`;
    return this.http.get<{ results: Character[] }>(query).pipe(
      map((data) => data.results)
    );
  }

}