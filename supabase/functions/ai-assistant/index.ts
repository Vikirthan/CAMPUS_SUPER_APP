import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { type, content, messages } = await req.json();

    let aiMessages: { role: string; content: string }[] = [];

    if (type === "summarize") {
      aiMessages = [
        {
          role: "system",
          content: `You are an AI email summarizer for IIT Ropar students. Given a long institute email, generate:
1. A concise, action-oriented summary (3-5 bullet points)
2. Categorize as one of: Academic, Events, Urgent, General
3. Highlight key dates, deadlines, and action items

Format your response as:
CATEGORY: [category]

SUMMARY:
[your summary bullet points]

KEY ACTIONS:
[any action items or deadlines]`,
        },
        { role: "user", content: content },
      ];
    } else if (type === "study") {
      aiMessages = [
        {
          role: "system",
          content: `You are an AI Study Assistant for IIT Ropar engineering students. You specialize in:
- Data Structures & Algorithms (DSA)
- Linear Algebra
- Operating Systems
- Core Engineering subjects

Provide clear, concise explanations with examples. Use code snippets when relevant. Be encouraging and pedagogical.`,
        },
        ...(messages || []).map((m: any) => ({ role: m.role, content: m.content })),
      ];
    } else if (type === "moderate") {
      aiMessages = [
        {
          role: "system",
          content: `You are a content moderator. Check if the following text contains abusive, explicit, or inappropriate language. Respond with JSON: {"safe": true/false, "reason": "explanation if unsafe"}`,
        },
        { role: "user", content: content },
      ];
    } else {
      throw new Error("Invalid type. Use 'summarize', 'study', or 'moderate'.");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: aiMessages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "";

    let result: Record<string, string> = { response: aiResponse };

    if (type === "summarize") {
      const categoryMatch = aiResponse.match(/CATEGORY:\s*(\w+)/i);
      result.category = categoryMatch?.[1] || "General";
      result.summary = aiResponse;
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
