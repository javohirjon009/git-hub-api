"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { ShoppingCart, Package, DollarSign, User } from "lucide-react";

export default function CartsPage() {
  const [carts, setCarts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarts();
    fetchUsers();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/carts?limit=20");
      const data = await response.json();
      setCarts(data.carts);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users?limit=100");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const totalRevenue = carts.reduce(
    (sum, cart) => sum + cart.discountedTotal,
    0
  );
  const totalItems = carts.reduce((sum, cart) => sum + cart.totalQuantity, 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-gray-200 rounded"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
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
        <h1 className="text-3xl font-bold mb-4">Shopping Carts</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{carts.length}</div>
                  <div className="text-sm text-gray-600">Total Carts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{totalItems}</div>
                  <div className="text-sm text-gray-600">Total Items</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">
                    ${totalRevenue.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {new Set(carts.map((c) => c.userId)).size}
                  </div>
                  <div className="text-sm text-gray-600">Unique Users</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        {carts.map((cart) => {
          const user = getUserById(cart.userId);
          const savings = cart.total - cart.discountedTotal;

          return (
            <Card key={cart.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={user?.image || "/placeholder.svg"}
                        alt={
                          user ? `${user.firstName} ${user.lastName}` : "User"
                        }
                      />
                      <AvatarFallback>
                        {user ? (
                          `${user.firstName[0]}${user.lastName[0]}`
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Cart #{cart.id}</CardTitle>
                      <CardDescription>
                        {user
                          ? `${user.firstName} ${user.lastName}`
                          : `User #${cart.userId}`}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      ${cart.discountedTotal.toFixed(2)}
                    </div>
                    {savings > 0 && (
                      <div className="text-sm text-green-600">
                        Saved ${savings.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Badge variant="outline">{cart.totalProducts} products</Badge>
                  <Badge variant="outline">{cart.totalQuantity} items</Badge>
                  {savings > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {((savings / cart.total) * 100).toFixed(1)}% off
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  {cart.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Qty: {product.quantity}</span>
                          <span>•</span>
                          <span>${product.price.toFixed(2)} each</span>
                          {product.discountPercentage > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-green-600">
                                {product.discountPercentage.toFixed(1)}% off
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${product.discountedTotal.toFixed(2)}
                        </div>
                        {product.total !== product.discountedTotal && (
                          <div className="text-sm text-gray-500 line-through">
                            ${product.total.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {carts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No carts found.</p>
        </div>
      )}
    </div>
  );
}
