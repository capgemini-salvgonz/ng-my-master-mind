import { Injectable } from "@angular/core";
import { GameStatistics } from "../model/game.model";

/**
 * Class GameStorageService
 * 
 * Manage local storage for game statistics
 */
@Injectable({ providedIn: 'root' })
export class GameStorageService {

  gameStatistics: GameStatistics | null;
  storageKey: 'statistics' = 'statistics';

  /**
   * Get statistics
   */
  public get statistics(): GameStatistics | null {
    return this.gameStatistics;
  }

  /**
   * Constructor
   */
  constructor() {
    const storage = localStorage.getItem(this.storageKey);
    this.gameStatistics = storage !== null
      ? JSON.parse(storage)
      : null;
  }

  /**
   * Save game statistics
   * 
   * @param statistics 
   */
  async saveStatistics(statistics: GameStatistics) {
    localStorage.setItem(this.storageKey, JSON.stringify(statistics));
  }

  /**
   * Delete data from storage
   */
  removeStorage() {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Read the local storage to retrieve the game statistics
   * 
   * @returns Promise<GameStatistics>
   */
  async retrieveStatistics(): Promise<GameStatistics> {
    const storage = localStorage.getItem(this.storageKey);
    if (storage === null) {
      throw new Error('No values on local storage');
    }
    return JSON.parse(storage);
  }
}