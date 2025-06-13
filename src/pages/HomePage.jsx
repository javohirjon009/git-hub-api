import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  ShoppingBag,
  Users,
  FileText,
  CheckSquare,
  Quote,
  ShoppingCart,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Products",
      description: "Browse through our extensive product catalog",
      href: "/products",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "Users",
      description: "Manage and view user profiles",
      href: "/users",
      color: "text-green-600",
    },
    {
      icon: FileText,
      title: "Posts",
      description: "Read and create blog posts",
      href: "/posts",
      color: "text-purple-600",
    },
    {
      icon: CheckSquare,
      title: "Todos",
      description: "Track your tasks and todos",
      href: "/todos",
      color: "text-orange-600",
    },
    {
      icon: Quote,
      title: "Quotes",
      description: "Discover inspiring quotes",
      href: "/quotes",
      color: "text-pink-600",
    },
    {
      icon: ShoppingCart,
      title: "Carts",
      description: "View shopping carts and orders",
      href: "/carts",
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <img
              src="https://assets.publish.postman.com/og-image?heading=WORKSPACE&entityName=Dummy%20Json&entityType=workspace&imageUrl=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_user_profile_300%2Fv1%2Fuser%2Fdefault-3&isVerified=false&teamName=Ikhsan%20Muhammad"
              alt="DummyJSON Hero"
              width={800}
              height={400}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            DummyJSON Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your comprehensive platform for exploring all DummyJSON services.
            Products, users, posts, todos, quotes, and more - all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/products">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore All Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <Link to={feature.href}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">100+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">30+</div>
              <div className="text-gray-600">Users</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">150+</div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Quote className="h-8 w-8 text-pink-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">1600+</div>
              <div className="text-gray-600">Quotes</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
