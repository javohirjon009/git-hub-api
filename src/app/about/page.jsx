import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Globe, Zap, Shield, Code } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Built with Next.js and optimized for performance",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "All data fetched securely from DummyJSON API",
    },
    {
      icon: Code,
      title: "Modern Tech Stack",
      description: "React, JavaScript, Tailwind CSS, and shadcn/ui",
    },
  ];

  const services = [
    {
      name: "Products",
      count: "100+",
      description: "E-commerce product catalog",
    },
    {
      name: "Users",
      count: "30+",
      description: "User profiles and information",
    },
    { name: "Posts", count: "150+", description: "Blog posts and articles" },
    { name: "Todos", count: "200+", description: "Task management system" },
    {
      name: "Quotes",
      count: "1600+",
      description: "Inspirational quotes collection",
    },
    { name: "Carts", count: "20+", description: "Shopping cart data" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About DummyJSON Hub</h1>
          <p className="text-xl text-gray-600 mb-6">
            A comprehensive platform that brings together all DummyJSON services
            in one unified, modern interface.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <a
                href="https://dummyjson.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4 mr-2" />
                Visit DummyJSON
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/Ovi/DummyJSON"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why DummyJSON Hub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Available Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.name} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {service.count}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">
              Built With Modern Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary">Next.js 15</Badge>
              <Badge variant="secondary">React 18</Badge>
              <Badge variant="secondary">JavaScript</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
              <Badge variant="secondary">Lucide Icons</Badge>
              <Badge variant="secondary">DummyJSON API</Badge>
            </div>
          </CardContent>
        </Card>

        {/* About DummyJSON */}
        <Card>
          <CardHeader>
            <CardTitle>About DummyJSON</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              DummyJSON is a free fake REST API service that provides
              placeholder JSON data for development and testing purposes. It
              serves over 100 million requests monthly and offers a wide variety
              of endpoints including products, users, posts, todos, quotes,
              carts, and much more.
            </p>
            <p>
              This hub application demonstrates how all these services can be
              integrated into a single, cohesive platform, providing developers
              with inspiration and examples for their own projects.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link href="/products">Explore Services</Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://dummyjson.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API Documentation
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
