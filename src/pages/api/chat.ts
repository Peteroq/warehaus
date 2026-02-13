export const prerender = false;

import type { APIRoute } from 'astro';
import type { ChatMessage } from '@/lib/chat/types';
import { getChatResponse } from '@/lib/chat/ai-client';

// Simple in-memory rate limiting: 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count++;
  return entry.count > 10;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { message, history } = body as {
      message: string;
      history: ChatMessage[];
    };

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'A non-empty "message" string is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const reply = await getChatResponse(history || [], message);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
