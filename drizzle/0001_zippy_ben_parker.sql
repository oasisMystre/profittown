ALTER TABLE "payments" ALTER COLUMN "proof" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "expiresAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastLogin" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "status" text DEFAULT 'pending' NOT NULL;