"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Quote, Search, Shuffle, Heart } from "lucide-react";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomQuote, setRandomQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchQuotes();
    fetchRandomQuote();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes?limit=100");
      const data = await response.json();
      setQuotes(data.quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      setRandomQuote(data);
    } catch (error) {
      console.error("Error fetching random quote:", error);
    }
  };

  const toggleFavorite = (quoteId) => {
    setFavorites((prev) =>
      prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const filteredQuotes = quotes.filter((quote) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      quote.quote.toLowerCase().includes(searchLower) ||
      quote.author.toLowerCase().includes(searchLower)
    );
  });

  const quotesByAuthor = filteredQuotes.reduce((acc, quote) => {
    if (!acc[quote.author]) {
      acc[quote.author] = [];
    }
    acc[quote.author].push(quote);
    return acc;
  }, {});

  const authors = Object.keys(quotesByAuthor);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card className="animate-pulse">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Quotes</h1>

        {/* Random Quote of the Day */}
        {randomQuote && (
          <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Quote className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <blockquote className="text-xl font-medium text-gray-900 mb-3">
                    "{randomQuote.quote}"
                  </blockquote>
                  <cite className="text-purple-600 font-semibold">
                    — {randomQuote.author}
                  </cite>
                  <div className="flex items-center gap-2 mt-4">
                    <Badge variant="secondary">Quote of the Day</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={fetchRandomQuote}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <Shuffle className="h-4 w-4 mr-1" />
                      New Quote
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search quotes or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge variant="outline" className="self-start">
            {filteredQuotes.length} quotes from {authors.length} authors
          </Badge>
        </div>
      </div>

      <div className="space-y-8">
        {authors.map((author) => (
          <div key={author}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{author}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotesByAuthor[author].map((quote) => (
                <Card
                  key={quote.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Quote className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <blockquote className="text-gray-700 mb-3 leading-relaxed">
                          "{quote.quote}"
                        </blockquote>
                        <div className="flex items-center justify-between">
                          <cite className="text-sm text-gray-500">
                            — {quote.author}
                          </cite>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(quote.id)}
                            className={
                              favorites.includes(quote.id)
                                ? "text-red-500"
                                : "text-gray-400"
                            }
                          >
                            <Heart
                              className={`h-4 w-4 ${favorites.includes(quote.id) ? "fill-current" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <Quote className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No quotes found matching your search.</p>
        </div>
      )}
    </div>
  );
}
