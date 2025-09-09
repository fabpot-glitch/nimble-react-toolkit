import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DataTable, { Column } from './DataTable';

// Sample data
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

// Generate more sample data for pagination testing
const generateMoreUsers = (count: number): User[] => {
  const roles: User['role'][] = ['Admin', 'User', 'Manager'];
  const statuses: User['status'][] = ['Active', 'Inactive', 'Pending'];
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: sampleUsers.length + i + 1,
    name: `${names[i % names.length]} ${Math.floor(Math.random() * 1000)}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    joinDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    lastLogin: Math.random() > 0.1 ? `2024-01-${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : 'Never',
  }));
};

const extendedUsers = [...sampleUsers, ...generateMoreUsers(50)];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful data table component with sorting, pagination, search, and selection features.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic columns
const basicColumns: Column<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
  },
];

// Enhanced columns with custom rendering
const enhancedColumns: Column<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (value, row) => (
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
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'center',
    render: (_, row) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
  },
};

export const Enhanced: Story = {
  args: {
    data: sampleUsers,
    columns: enhancedColumns,
  },
};

export const WithPagination: Story = {
  args: {
    data: extendedUsers,
    columns: enhancedColumns,
    pagination: true,
    pageSize: 10,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: enhancedColumns,
    selectable: true,
    onSelectionChange: (selectedRows) => {
      console.log('Selected rows:', selectedRows);
    },
  },
};

export const NoSearch: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    searchable: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: enhancedColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: enhancedColumns,
    emptyMessage: 'No users found. Try adjusting your search criteria.',
  },
};

export const Striped: Story = {
  args: {
    data: sampleUsers,
    columns: enhancedColumns,
    variant: 'striped',
  },
};

export const Bordered: Story = {
  args: {
    data: sampleUsers,
    columns: enhancedColumns,
    variant: 'bordered',
  },
};

export const Compact: Story = {
  args: {
    data: sampleUsers,
    columns: enhancedColumns,
    size: 'compact',
  },
};

export const Comfortable: Story = {
  args: {
    data: sampleUsers,
    columns: enhancedColumns,
    size: 'comfortable',
  },
};

export const CustomEmpty: Story = {
  args: {
    data: [],
    columns: enhancedColumns,
    emptyMessage: '🔍 No results found. Try a different search term.',
  },
};

export const FullFeatures: Story = {
  args: {
    data: extendedUsers,
    columns: enhancedColumns,
    pagination: true,
    pageSize: 8,
    searchable: true,
    selectable: true,
    searchPlaceholder: 'Search users by name, email, or role...',
    variant: 'striped',
    onSelectionChange: (selectedRows) => {
      console.log(`${selectedRows.length} rows selected`);
    },
  },
};