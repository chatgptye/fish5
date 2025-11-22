import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllProducts();
    }),
    getAvailable: publicProcedure.query(async () => {
      return await db.getAvailableProducts();
    }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        price: z.number().optional(),
        available: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const { id, ...data } = input;
        await db.updateProduct(id, data);
        return { success: true };
      }),
  }),

  orders: router({
    create: publicProcedure
      .input(z.object({
        customerName: z.string(),
        customerPhone: z.string(),
        location: z.string(),
        street: z.string().optional(),
        landmark: z.string().optional(),
        orderDetails: z.string(), // JSON string
        totalAmount: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.createOrder({
          ...input,
          street: input.street || null,
          landmark: input.landmark || null,
        });
        return { success: true };
      }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
      }
      return await db.getAllOrders();
    }),
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        await db.updateOrder(input.id, { status: input.status });
        return { success: true };
      }),
  }),

  articles: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllArticles();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const article = await db.getArticleBySlug(input.slug);
        if (!article) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Article not found' });
        }
        // Increment view count
        await db.incrementArticleViews(article.id);
        return article;
      }),
  }),
});

export type AppRouter = typeof appRouter;
