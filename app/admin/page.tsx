import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Manage your Divine Clothing business
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Products</p>
          <p className="text-3xl font-bold">12</p>
          <p className="text-xs text-muted-foreground mt-2">6 active</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Messages</p>
          <p className="text-3xl font-bold">8</p>
          <p className="text-xs text-muted-foreground mt-2">3 unread</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Collections</p>
          <p className="text-3xl font-bold">4</p>
          <p className="text-xs text-muted-foreground mt-2">View all</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Users</p>
          <p className="text-3xl font-bold">1</p>
          <p className="text-xs text-muted-foreground mt-2">Admin user</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-2">Add New Product</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create and list a new product
            </p>
            <Link href="/admin/products/new">
              <Button variant="outline" size="sm">
                Create Product
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-2">View Messages</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Check customer inquiries
            </p>
            <Link href="/admin/messages">
              <Button variant="outline" size="sm">
                View Messages
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-2">Manage Inventory</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Update product availability
            </p>
            <Link href="/admin/products">
              <Button variant="outline" size="sm">
                Manage Products
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Recent Products */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Products</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Price</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "1",
                  name: "Silk Evening Gown",
                  price: "$299.99",
                  status: "Published",
                },
                {
                  id: "2",
                  name: "Cashmere Sweater",
                  price: "$179.99",
                  status: "Published",
                },
                {
                  id: "3",
                  name: "Linen Blouse",
                  price: "$89.99",
                  status: "Draft",
                },
              ].map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === "Published"
                        ? "bg-green-100/20 text-green-700"
                        : "bg-yellow-100/20 text-yellow-700"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
