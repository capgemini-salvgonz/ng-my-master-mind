import { Injectable } from "@angular/core";
import * as _ from 'underscore';


export type OptionSelected = 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'gray' | 'alpha';

export type PasswordClues = {
  index: number;
  selection: string[];
  clues: string[];
};

@Injectable({ providedIn: 'root' })
export class MasterMindService {

  private password: string = '';
  private options: string[];
  public hints: string[] = [];
  public readonly maxAttempt: number = 10;
  public attempt: number = 1;
  public passwordClues: PasswordClues[] = [];
  public gameState: 'lost' | 'won' | 'ip' = 'ip';

  /**
   * Create an instance of MasterMindService
   */
  constructor() {
    this.options = ['red', 'blue', 'yellow', 'green', 'orange', 'gray'];
    this.newGame();
  }

  /**
   * Inizialize variables for a new game
   */
  newGame() {
    this.createNewPassword();
    this.gameState = 'ip';
    this.attempt = 0;
    this.passwordClues = [];
    for (let index = 0; index < 10; index++) {
      this.passwordClues.push({
        index,
        selection: ['alpha', 'alpha', 'alpha', 'alpha', 'alpha'],
        clues: ['g', 'g', 'g', 'g', 'g']
      });
    }
  }

  /**
   * Set a color in a specific position
   * 
   * @param index position of a color answer
   * @param value color to set at the position given by index value
   */
  setAnswer(index: number, value: OptionSelected) {
    this.passwordClues[this.attempt].selection[index] = value;
  }

  /**
   * Create a new password
   * replace the existing password
   */
  createNewPassword(): void {
    this.hints = _.shuffle([...this.options, ...this.options]).slice(0, 5);
    this.password = this.hints.join('-');
  }

  /**
   * Validate the password
   * @param password to validate against the password created
   * @returns true when the password match
   */
  validate(): boolean {
    if (this.maxAttempt === this.attempt) {
      return false;
    }
    const isCorrectPassword = this.password === this.passwordClues[this.attempt].selection.join('-');
    this.setClues();
    this.attempt += 1;
    this.gameState = isCorrectPassword ? 'won' : (this.maxAttempt === this.attempt) ? 'lost' : 'ip';
    return isCorrectPassword;
  }

  /**
   * Set Clues
   */
  private setClues() {
    const passwordKeys = this.passwordClues[this.attempt].selection;
    const passwordClues = this.passwordClues[this.attempt].clues;

    for (let index = 0; index < this.hints.length; index++) {

      passwordClues[index] = this.hints[index] === passwordKeys[index]
        ? 'b'
        : this.hints.includes(passwordKeys[index]) ? 'y' : 'g';
    }
  }

}