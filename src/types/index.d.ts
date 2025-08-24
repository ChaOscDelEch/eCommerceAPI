import type { Request } from 'express';

// TO AVOID ERROR : 
// "Property 'user' does not exist on type 'Request<ParamsDictionary, ... Record<string, any>>'," ?

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roles: string[];
      };
    }
  }
}