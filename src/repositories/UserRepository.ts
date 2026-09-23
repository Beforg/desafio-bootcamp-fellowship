import User from "../entities/User.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";
import type IUserRepository from "./interfaces/IUserRepository.ts";

export default class UserRepository implements IUserRepository {

    private users: Map<number, User> = new Map<number, User>();

    save(objectToSave: User): User {
        const userAlreadyExists = this.users.get(objectToSave.id);
        if (userAlreadyExists) throw new Error("User already registered.");
        this.users.set(objectToSave.id, objectToSave);
        return objectToSave;
    }
    findById(id: number): User {
        const user = this.users.get(id);
        if (!user) throw new Error("User not found.");
        return user;
    }
    findAll(): User[] {
        const allUsers: User[] = Array.from(this.users.values());
        if (allUsers.length === 0) throw new Error("No users registered.");
        return allUsers;
    }
}