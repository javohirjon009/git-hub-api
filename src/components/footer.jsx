import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DummyJSON Hub</h3>
            <p className="text-gray-400">
              Your comprehensive platform for exploring all DummyJSON services
              in one unified interface.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/users" className="hover:text-white">
                  Users
                </Link>
              </li>
              <li>
                <Link to="/posts" className="hover:text-white">
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/todos" className="hover:text-white">
                  Todos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">More</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/quotes" className="hover:text-white">
                  Quotes
                </Link>
              </li>
              <li>
                <Link to="/carts" className="hover:text-white">
                  Carts
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="hover:text-white">
                  Recipes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="https://dummyjson.com"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DummyJSON API
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DummyJSON Hub. Built with DummyJSON API.</p>
        </div>
      </div>
    </footer>
  );
}
