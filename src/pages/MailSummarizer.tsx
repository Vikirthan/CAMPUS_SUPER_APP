import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Sparkles, Loader2, AlertTriangle, Calendar, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function MailSummarizer() {
  const [emailText, setEmailText] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!emailText.trim()) {
      toast.error("Please paste an email to summarize");
      return;
    }
    setLoading(true);
    setSummary("");
    setCategory("");

    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { type: "summarize", content: emailText },
      });
      if (error) throw error;
      setSummary(data.summary || data.response || "No summary generated.");
      setCategory(data.category || "General");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to summarize. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">📧 AI Mail Summarizer</h1>
        <p className="text-muted-foreground">Paste long institute emails and get concise, action-oriented summaries</p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Paste your institute email here..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          className="min-h-[200px] resize-y"
        />
        <Button onClick={handleSummarize} disabled={loading} className="gradient-pulse border-0">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          {loading ? "Analyzing..." : "Summarize Email"}
        </Button>
      </div>

      {summary && (
        <Card className="animate-fade-in border-pulse/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-pulse" />
              <h3 className="font-semibold text-lg">AI Summary</h3>
              {category && (
                <Badge className={`ml-auto ${
                  category === "Academic" ? "pillar-academic" :
                  category === "Urgent" ? "status-rejected" :
                  category === "Events" ? "pillar-exchange" : "pillar-pulse"
                }`}>
                  {category === "Academic" ? <BookOpen className="w-3 h-3 mr-1" /> :
                   category === "Urgent" ? <AlertTriangle className="w-3 h-3 mr-1" /> :
                   <Calendar className="w-3 h-3 mr-1" />}
                  {category}
                </Badge>
              )}
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
