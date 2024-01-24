import { z } from "zod";
import { FormSchema } from "./constants";

export type FormValues = z.infer<typeof FormSchema>

export type GraphqlMessageError = {
    message: string;
  };
  
  export function isGraphqlMessageError(
    error: unknown,
  ): error is GraphqlMessageError {
    return !!(<GraphqlMessageError>error).message;
  }