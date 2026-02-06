import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrainCircuit, Send, Loader2, User, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function StudyAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI Study Assistant. I can help with DSA, Linear Algebra, Operating Systems, and other engineering subjects. What would you like to learn?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { type: "study", messages: [...messages, userMsg] },
      });
      if (error) throw error;
      setMessages((prev) => [...prev, { role: "assistant", content: data.response || "I couldn't generate a response. Please try again." }]);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to get response. Please try again.");
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BrainCircuit className="w-7 h-7 text-academic" /> AI Study Assistant
        </h1>
        <p className="text-muted-foreground">Ask questions about DSA, Linear Algebra, OS, and more</p>
      </div>

      <Card className="h-[calc(100vh-300px)] flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full gradient-academic flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-academic-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user" ? "gradient-primary text-primary-foreground rounded-br-md" : "bg-secondary rounded-bl-md"
              }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-academic flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-academic-foreground" />
              </div>
              <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </CardContent>
        <div className="p-4 border-t border-border">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about DSA, Linear Algebra, OS..." className="flex-1" disabled={loading} />
            <Button type="submit" disabled={loading || !input.trim()} className="gradient-academic border-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
