import React, { useState } from 'react';
import { Search, Mail, Lock, User, Settings, Shield, Calendar } from 'lucide-react';
import InputField from '@/components/InputField';
import DataTable, { Column } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data for demonstration
interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Manager';
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  lastLogin: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20 10:30',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2023-02-20',
    lastLogin: '2024-01-19 14:45',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Manager',
    status: 'Inactive',
    joinDate: '2023-03-10',
    lastLogin: '2024-01-10 09:15',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'User',
    status: 'Pending',
    joinDate: '2023-04-05',
    lastLogin: 'Never',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2023-05-12',
    lastLogin: '2024-01-18 16:20',
  },
];

const Index = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Define table columns with custom rendering
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (value) => (
        <div className="font-medium">{value}</div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      render: (value) => (
        <span className="text-muted-foreground">{value}</span>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      align: 'center',
      render: (value) => {
        const colors = {
          Admin: 'bg-destructive/10 text-destructive border-destructive/20',
          Manager: 'bg-warning/10 text-warning border-warning/20',
          User: 'bg-primary/10 text-primary border-primary/20',
        };
        return (
          <Badge variant="outline" className={colors[value as keyof typeof colors]}>
            <Shield className="h-3 w-3 mr-1" />
            {value}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'center',
      render: (value) => {
        const colors = {
          Active: 'bg-success/10 text-success border-success/20',
          Inactive: 'bg-muted text-muted-foreground border-muted-foreground/20',
          Pending: 'bg-warning/10 text-warning border-warning/20',
        };
        return (
          <Badge variant="outline" className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      },
    },
    {
      key: 'joinDate',
      header: 'Join Date',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm">
          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Component Library Showcase
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional React components built with TypeScript, Tailwind CSS, and accessibility in mind.
              Featuring InputField and DataTable components with extensive customization options.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* InputField Demo */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                InputField Component
              </CardTitle>
              <CardDescription>
                Versatile input fields with multiple variants, states, and built-in validation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Examples</h3>
                  <InputField
                    label="Full Name"
                    placeholder="Enter your full name"
                    leftIcon={<User className="h-4 w-4" />}
                    required
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    leftIcon={<Mail className="h-4 w-4" />}
                    helperText="We'll never share your email"
                  />
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    leftIcon={<Lock className="h-4 w-4" />}
                    showPasswordToggle
                    helperText="Must be at least 8 characters"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">States & Variants</h3>
                  <InputField
                    label="Success State"
                    placeholder="Username taken"
                    leftIcon={<User className="h-4 w-4" />}
                    success="Username is available!"
                  />
                  <InputField
                    label="Error State"
                    type="email"
                    placeholder="invalid-email"
                    leftIcon={<Mail className="h-4 w-4" />}
                    error="Please enter a valid email address"
                  />
                  <InputField
                    label="Search (Filled Variant)"
                    placeholder="Search products..."
                    leftIcon={<Search className="h-4 w-4" />}
                    variant="filled"
                    size="large"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* DataTable Demo */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  DataTable Component
                </div>
                {selectedUsers.length > 0 && (
                  <Badge variant="secondary">
                    {selectedUsers.length} selected
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Feature-rich data table with sorting, pagination, search, and row selection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={sampleUsers}
                columns={columns}
                searchable
                selectable
                searchPlaceholder="Search users by name, email, or role..."
                variant="striped"
                onSelectionChange={setSelectedUsers}
                pagination={false} // Disabled for demo with small dataset
              />
            </CardContent>
          </Card>
        </section>

        {/* Features Overview */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Component Features</h2>
            <p className="text-lg text-muted-foreground">
              Built with modern React patterns and best practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎨 Design System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Consistent theming with CSS custom properties, HSL colors, and design tokens
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">♿ Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ARIA labels, keyboard navigation, focus management, and screen reader support
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📱 Responsive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mobile-first design with responsive layouts and touch-friendly interactions
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔧 TypeScript</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Full type safety with comprehensive interfaces and generic support
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Multiple variants, sizes, and extensive props for customization
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📚 Documented</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive Storybook documentation with interactive examples
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Built with React, TypeScript, Tailwind CSS, and Storybook
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
