import { Injectable } from "@angular/core";
import * as _ from 'underscore';


export type OptionSelected = 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'gray' | 'alpha';
type PasswordClues = {
  selection: string[];
  clues: string[];
};

@Injectable({ providedIn: 'root' })
export class MasterMindService {

  private password: string = '';
  private options: string[];
  private readonly maxAttempt: number = 10;
  private attempt: number = 1;
  public currentAnswer: string[] = [];


  /**
   * Create an instance of MasterMindService
   */
  constructor() {
    this.options = ['red', 'blue', 'yellow', 'green', 'orange', 'gray'];
    this.newGame();
  }

  newGame() {
    this.createNewPassword();
    this.attempt = 0;
    /**
     * TO DO 
     * Create an Array to track current try and initialize
     * Create an Array to track clues and initialize
     * Create an Array to track previous password and initialize
     */
    this.currentAnswer = ['alpha', 'alpha', 'alpha', 'alpha', 'alpha'];
  }

  setAnswer(index: number, value: OptionSelected) {
    this.currentAnswer[index] = value;
  }

  /**
   * Create a new password
   * replace the existing password
   */
  createNewPassword(): void {
    this.password = _.shuffle([...this.options, ...this.options]).slice(0, 5).join('-');
  }

  /**
   * Validate the password
   * @param password to validate against the password created
   * @returns true when the password match
   */
  validate(): boolean {
    this.attempt += 1;
    return this.password === this.currentAnswer.join('-');
  }

}