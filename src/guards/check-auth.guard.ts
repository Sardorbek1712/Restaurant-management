import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Request } from 'express';
  import { Observable } from 'rxjs';
  import { Protected } from 'src/decorators';
  
  @Injectable()
  export class CheckAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
  
      // GET 'PROTECTED' DECORATOR VALUE FROM REFLECTOR
      const isProtected = this.reflector.get<boolean>(
        Protected,
        context.getHandler(),
      );
  
      // GET BEARER TOKEN FROM AUTHORIZATION HEADER
      const bearerToken = request.headers['authorization'];
  
      // CHECK IF BEARER TOKEN IS VALID AND AVAILABLE
      if (
        !(
          bearerToken &&
          bearerToken.startsWith('Bearer') &&
          bearerToken.split('Bearer ')[1]?.length
        )
      ) {
        throw new BadRequestException('Please provide valid bearer token');
      }
  
      // SPLIT ACCESS TOKEN FROM BEARER TOKEN
      const token = bearerToken.split('Bearer ')[1];
      console.log(token, isProtected, 'access token from guard');
  
      return true;
    }
  }
  