import { Request, Response, NextFunction } from "express";
import { errors } from "jose";
import { ZodSchema, ZodError, success } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        massage: "Validasi Gagal",
        errors: result.error.issues.map((i) => ({
          fiels: i.path.slice(1).join("."),
          message: i.message,
        })),
      });
    }

    const { body, query, params } = result.data as any;
    req.body = body;
    res.locals.query = query;
    res.locals.params = params;
    next();
  };
