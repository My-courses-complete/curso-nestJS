import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }
}
