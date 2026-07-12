import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared fields present on every content type
const sharedFields = {
	title: z.string(),
	eyebrow: z.string().optional(),
	dek: z.string().optional(),
	publishDate: z.coerce.date().optional(),
	readingTime: z.string().optional(),
	seoTitle: z.string().optional(),
	metaDescription: z.string().optional(),
	ogImage: z.string().optional(),
	primaryTopic: z.string().optional(),
	relatedContent: z.array(z.string()).optional(),
	status: z.enum(['draft', 'published']).default('draft'),
};

// Long-form articles: flagship essays and standard essays
const writing = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		...sharedFields,
		contentType: z.enum(['flagship-essay', 'essay']).default('essay'),
		premise: z.string(),
		featuredVisual: z.string().optional(),
		pullQuote: z.string().optional(),
	}),
});

// Compact numbered field notes
const fieldNotes = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/field-notes' }),
	schema: z.object({
		...sharedFields,
		contentType: z.literal('field-note').default('field-note'),
		fieldNoteNumber: z.number(),
		seriesLabel: z.string(),
		signal: z.string(),
		pullQuote: z.string().optional(),
		artifact: z.string().optional(),
	}),
});

// Case studies
const work = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
	schema: z.object({
		...sharedFields,
		contentType: z.literal('case-study').default('case-study'),
		clientName: z.string(),
		strategicTitle: z.string(),
		category: z.string(),
		summary: z.string(),
		visibleProblem: z.string(),
		hiddenSystemIssue: z.string(),
		stakes: z.string(),
		operatingIntervention: z.string(),
		whatChanged: z.string(),
		leadershipLesson: z.string(),
		role: z.string().optional(),
		sector: z.string().optional(),
		timeline: z.string().optional(),
		platform: z.string().optional(),
		metrics: z
			.array(
				z.object({
					value: z.string(),
					label: z.string(),
					qualifier: z.string().optional(),
				})
			)
			.optional(),
		visualAsset: z.string().optional(),
		artifactFigure: z.string().optional(),
		anonymized: z.boolean().optional(),
		confidentialityNote: z.string().optional(),
	}),
});

export const collections = {
	writing,
	'field-notes': fieldNotes,
	work,
};
