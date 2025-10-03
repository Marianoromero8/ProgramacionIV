import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<any>, property: "body" | "query" | "params") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(422).json({ errors: err.issues });
      }
      res.status(400).json({ error: (err as Error).message });
    }
  };

