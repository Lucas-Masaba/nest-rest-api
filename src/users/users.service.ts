import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

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
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length) {
        throw new NotFoundException('User Role Not found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id == id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removeUser;
  }
}
