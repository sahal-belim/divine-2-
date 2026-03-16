"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    message:
      "Hi, I'm interested in the Silk Evening Gown. Do you have it in size XL?",
    createdAt: "2024-03-10T10:30:00",
    read: false,
  },
  {
    id: "2",
    name: "Emma Davis",
    email: "emma@example.com",
    message: "Could you provide more information about the material composition?",
    createdAt: "2024-03-09T14:15:00",
    read: true,
  },
  {
    id: "3",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    message: "How long does shipping usually take?",
    createdAt: "2024-03-08T09:45:00",
    read: true,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleMarkAsRead = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    setShowDialog(false);
  };

  const handleOpenMessage = (message: Message) => {
    setSelectedMessage(message);
    handleMarkAsRead(message.id);
    setShowDialog(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Messages</h1>
        <p className="text-lg text-muted-foreground">
          {unreadCount > 0
            ? `You have ${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
            : "All messages read"}
        </p>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.length > 0 ? (
          messages.map((message) => (
            <Card
              key={message.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                !message.read ? "border-l-4 border-l-primary" : ""
              }`}
              onClick={() => handleOpenMessage(message)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{message.name}</h3>
                    {!message.read && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {message.email}
                  </p>
                  <p className="text-foreground line-clamp-2">
                    {message.message}
                  </p>
                </div>
                <div className="ml-4 text-right flex flex-col items-end gap-2">
                  <p className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No messages yet</p>
          </Card>
        )}
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              {selectedMessage?.email} • Sent{" "}
              {selectedMessage && new Date(selectedMessage.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-6 py-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-foreground whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    const subject = `Re: Message from Divine Clothing`;
                    window.location.href = `mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                      subject
                    )}`;
                  }}
                >
                  Reply via Email
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    const message = `Hi ${selectedMessage.name.split(" ")[0]}, Thanks for reaching out to Divine Clothing!`;
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(message)}`,
                      "_blank"
                    );
                  }}
                >
                  Message on WhatsApp
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
