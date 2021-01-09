
import DataLoader from "dataloader";
import { User } from '../entities/User'
//keys: [1,2,5,32]
//[{id: 1, username:bob}, {id:2, username:joe}, etc...]



export const createUserLoader = () => new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((user) => {
        userIdToUser[user.id] = user;
    });
    return userIds.map((userId) => userIdToUser[userId])
});