import { IUser } from "../entity";
import clonedeep from "lodash.clonedeep";
import { appSettings } from "../appSettings";

const inMemory: { users: IUser[] } = {
  users: [
    {
      id: "user-1",
      name: "roland-gosselin",
      nickname: "axel",
      age: 38,
    },
    {
      id: "user-2",
      name: "bie",
      nickname: "axel",
      age: 25,
    },
  ],
};

export class UserService {
  public async all() {
    const result = await new Promise<IUser[]>((resolve, _) => {
      setTimeout(() => {
        resolve(clonedeep<IUser[]>(inMemory.users));
      }, appSettings.remoteService.timeout);
    });

    return result;
  }

  public async get(id: string | undefined) {
    const result = await new Promise<IUser>((resolve, reject) => {
      if (!id) reject(new Error("Argument 'id' is missing"));

      setTimeout(() => {
        const result = inMemory.users.find((i) => i.id === id);
        if (result) resolve(clonedeep<IUser>(result));
        else reject(new Error(`user '${id}' not found`));
      }, appSettings.remoteService.timeout);
    });

    return result;
  }
  public set(user: IUser) {
    return user.id ? this.update(user) : this.insert(user);
  }

  public async insert(user: IUser) {
    const result = await new Promise<IUser>((resolve, reject) => {
      if (user.id)
        reject(new Error("user has an id so it as already be inserted"));

      setTimeout(() => {
        const index = inMemory.users.findIndex((i) => i.id === user.id);
        if (index >= 0) {
          reject(new Error("user found, cannot be inserted"));
          return;
        }

        inMemory.users.push(clonedeep<IUser>(user));
        resolve(user);
      }, appSettings.remoteService.timeout);
    });

    return result;
  }

  public async update(user: IUser) {
    const result = await new Promise<IUser>((resolve, reject) => {
      if (!user.id)
        reject(new Error("user has no id so it should be inserted before"));

      setTimeout(() => {
        const index = inMemory.users.findIndex((i) => i.id === user.id);
        if (index < 0) {
          reject(new Error("user not found, cannot be updated"));
          return;
        }

        inMemory.users[index] = clonedeep<IUser>(user);
        resolve(user);
      }, appSettings.remoteService.timeout);
    });

    return result;
  }
}
