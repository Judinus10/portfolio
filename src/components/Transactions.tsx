import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Search, Download, Filter, ArrowUpDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import SectionHeading from './SectionHeading';
import { transactions } from '@/lib/brand';
import { exportTransactionsToCSV } from '@/lib/csv';
import type { Transaction } from '@/lib/brand';

type SortField = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';
type StatusFilter = 'all' | 'success' | 'pending' | 'failed';

export default function Transactions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter(tx => {
      const matchesSearch = 
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchTerm, statusFilter, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleExportCSV = () => {
    exportTransactionsToCSV(filteredAndSortedTransactions, 'portfolio-transactions.csv');
  };

  const getStatusBadgeClass = (status: Transaction['status']) => {
    switch (status) {
      case 'success':
        return 'status-success';
      case 'pending':
        return 'status-pending';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  };

  const formatAmount = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section id="transactions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Transaction History"
          subtitle="A transparent view of all financial activities and transactions."
        />

        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" className="p-6">
            {/* Filters and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex rounded-lg border border-border p-1">
                  {(['all', 'success', 'pending', 'failed'] as StatusFilter[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        statusFilter === status
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>

                <Button variant="outline" size="sm" onClick={handleExportCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  CSV
                </Button>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Transaction ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => handleSort('amount')}
                        className="flex items-center space-x-1 hover:text-foreground transition-colors"
                      >
                        <span>Amount</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => handleSort('date')}
                        className="flex items-center space-x-1 hover:text-foreground transition-colors"
                      >
                        <span>Date</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-muted-foreground">
                        No transactions found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedTransactions.map((transaction, index) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                        <td className="py-3 px-4">{transaction.description}</td>
                        <td className="py-3 px-4 font-semibold">
                          <span className={transaction.amount < 0 ? 'text-red-600' : 'text-foreground'}>
                            {formatAmount(transaction.amount)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="status" className={getStatusBadgeClass(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {formatDate(transaction.date)}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredAndSortedTransactions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions found matching your criteria.
                </div>
              ) : (
                filteredAndSortedTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 border border-border rounded-lg bg-card"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-mono text-sm text-muted-foreground">{transaction.id}</p>
                        <p className="font-medium">{transaction.description}</p>
                      </div>
                      <Badge variant="status" className={getStatusBadgeClass(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-foreground'}`}>
                        {formatAmount(transaction.amount)}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Summary */}
            {filteredAndSortedTransactions.length > 0 && (
              <motion.div
                className="mt-6 pt-4 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>
                    Showing {filteredAndSortedTransactions.length} of {transactions.length} transactions
                  </span>
                  <span>
                    Total: {formatAmount(
                      filteredAndSortedTransactions.reduce((sum, tx) => sum + tx.amount, 0)
                    )}
                  </span>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}