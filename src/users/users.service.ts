import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Scorpion',
      email: 'scorpion@mk.game',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Sub-Zero',
      email: 'subzero@mk.game',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Liu Kang',
      email: 'liukang@mk.game',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Raiden',
      email: 'raiden@mk.game',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Sonya',
      email: 'sonya@mk.game',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id == id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
      return user;
    });
  }

  delete(id: number) {
    const removeUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removeUser;
  }
}
