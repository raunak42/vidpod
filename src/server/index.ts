import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { db } from '@/lib/prisma';

const AdSchema = z.object({
    length: z.number(),
    name: z.string(),
    company: z.string(),
    coverImage: z.string(),
    videoUrl: z.string(),
    publishedDate: z.string(),
});


export const appRouter = router({
    getMarkers: publicProcedure.query(async () => {
        const markers = await db.adMarker.findMany()
        return markers;
    }),

    newMarker: publicProcedure
        .input(z.object({
            adType: z.enum(["Auto", "Static", "A/B test", ""]),
            adStarts: z.number(),
            ads: z.array(AdSchema).optional(),
        }))
        .mutation(async ({ input }) => {
            await db.adMarker.create({
                data: {
                    markerStart: input.adStarts,
                    markerType: input.adType,
                    ads: input.ads ? {
                        create: input.ads.map(ad => ({
                            length: ad.length,
                            name: ad.name,
                            company: ad.company,
                            coverImage: ad.coverImage,
                            videoUrl: ad.videoUrl,
                            publishedDate: ad.publishedDate,
                        }))
                    } : undefined
                }
            })
            console.log(JSON.stringify(input));
            return { success: true, message: "Success" };
        }),

    deleteMarker: publicProcedure
        .input(z.number())
        .mutation(async ({ input }) => {
            await db.adMarker.delete({
                where: {
                    id: input
                }
            })
        }),

    editMarker: publicProcedure
        .input(z.object({
            markerId: z.number(), newStart: z.number(), adType: z.enum(["Auto", "Static", "A/B test", ""]),
        }))
        .mutation(async ({ input }) => {
            await db.adMarker.update({
                where: {
                    id: input.markerId
                },
                data: {
                    markerStart: input.newStart,
                    markerType: input.adType
                }
            })
        }),

    getAds: publicProcedure.query(async () => {
        const ads = await db.ad.findMany()
        return ads;
    })
});
export type AppRouter = typeof appRouter;

