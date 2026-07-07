CREATE TABLE "public"."projects" ("id" serial NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "link" text NOT NULL, "winner" boolean NOT NULL DEFAULT false, PRIMARY KEY ("id") );
