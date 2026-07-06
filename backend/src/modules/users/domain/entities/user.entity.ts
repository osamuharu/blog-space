import bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';

const USERNAME_MAX_LENGTH = 15;
const USERNAME_RANDOM_SUFFIX_LENGTH = 4;
const USERNAME_BASE_MAX_LENGTH =
  USERNAME_MAX_LENGTH - USERNAME_RANDOM_SUFFIX_LENGTH;

export class User {
  private _id?: string;
  private _email: string;
  private _password: string;
  private _fullName: string;
  private _username: string;

  constructor({
    id,
    email,
    password,
    fullName,
    username,
  }: {
    id?: string;
    email: string;
    password: string;
    fullName: string;
    username?: string;
  }) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._fullName = fullName;
    this._username = username ?? this.generateUsernameFromEmail(email);
  }

  public get id(): string | undefined {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get fullName(): string {
    return this._fullName;
  }

  public get username(): string {
    return this._username;
  }

  public hashPassword() {
    const salt = bcrypt.genSaltSync();
    this._password = bcrypt.hashSync(this._password, salt);
  }

  private generatePadding(targetLength: number): string {
    let padding = '';
    for (let i = 0; i < targetLength; i++) {
      padding += randomInt(0, 10).toString(); // Sinh số từ 0-9
    }
    return padding;
  }

  private getBaseUsername(email: string): string {
    const base = email
      .split('@')[0]
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();

    return base.substring(0, USERNAME_BASE_MAX_LENGTH);
  }

  public generateUsernameFromEmail(email: string): string {
    const baseUsername = this.getBaseUsername(email);
    const padding = this.generatePadding(USERNAME_RANDOM_SUFFIX_LENGTH);
    return `${baseUsername}${padding}`;
  }

  public changeUsername(username: string) {
    this._username = username;
  }
}
