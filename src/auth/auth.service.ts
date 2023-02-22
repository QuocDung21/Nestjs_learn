import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2'
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  async signup(dbo: AuthDto) {
    try {
      const hash = await argon.hash(dbo.password)
      const user = await this.prisma.user.create({
        data: {
          email: dbo.email,
          hash
        }
      })
      delete user.hash
      // return the saved user
      return user
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials incorrect'
          )
        }
      }
    }
  }

  async signin(dbo: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dbo.email
      }
    })

    if (!user) throw new ForbiddenException('Credentials incorrect')

    const pwMatches = await argon.verify(user.hash, dbo.password)
    if(!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect'
      )
    return {
      data: "sign in"
    }
  }
}