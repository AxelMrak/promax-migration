import { UUID } from "crypto";

export type ExactCode = {
  id: UUID;
  code: string;
  description: string;
};
