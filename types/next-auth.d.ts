import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
// import "next-auth/jwt"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

enum Role {
  "ADMIN" = "ADMIN",
  "ARTIST" = "ARTIST",
  "VENUE" = "VENUE",
}

declare module "next-auth" {
  interface Session {
    id: string;
    role: Role;
  }

  interface User {
    id: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: Role;
  }
}

export enum Color {
  "SLATE" = "slate",
  "BLUE" = "blue",
  "WHITE" = "white",
}

export enum Variant {
  "SOLID" = "solid",
  "OUTLINE" = "outline",
}