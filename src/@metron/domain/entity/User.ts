import { IEntity } from "./IEntity";

export interface IUser extends IEntity {
  name: string;
  nickname: string;
  age?: number;
}
