'use client';

import Loading from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';
import { useGetTransactionsQuery } from '@/state/api';
import { useUser } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownUp, LineChart, Receipt, WalletCards } from 'lucide-react';
import { useEffect, useState } from 'react';

const TeacherBilling = () => {
  const [paymentType, setPaymentType] = useState('all');
  const { user, isLoaded } = useUser();
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(user?.id || '', {
      skip: !isLoaded || !user,
    });

  // Error handling improvements
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (/ResizeObserver/.test(e.message)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const filteredData =
    transactions?.filter((transaction) => {
      const matchesTypes =
        paymentType === 'all' || transaction.paymentProvider === paymentType;
      return matchesTypes;
    }) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to view your billing information.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='min-h-screen bg-white-100 p-6 md:p-8'
    >
      <div className='max-w-6xl mx-auto space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div className='space-y-1'>
            <h1 className='text-3xl font-bold text-primary-900'>Earnings</h1>
            <p className='text-primary-600'>
              Manage your transactions and payment history
            </p>
          </div>

          <div className='w-full md:w-auto'>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger className='w-full md:w-[240px] h-12  ring-1 ring-primary-300'>
                <div className='flex items-center gap-2'>
                  <ArrowDownUp className='h-4 w-4 text-primary-600' />
                  <SelectValue
                    placeholder='Payment Type'
                    className='text-primary-900'
                  />
                </div>
              </SelectTrigger>
              <SelectContent
                position='popper'
                sideOffset={5}
                className='z-[1000] bg-primary-100 text-primary-900 border border-primary-200 rounded-md'
              >
                <SelectItem
                  value='all'
                  className='hover:bg-primary-200 focus:bg-primary-200'
                >
                  All Transactions
                </SelectItem>
                <SelectItem
                  value='stripe'
                  className='hover:bg-primary-200 focus:bg-primary-200'
                >
                  Stripe Payments
                </SelectItem>
                <SelectItem
                  value='paypal'
                  className='hover:bg-primary-200 focus:bg-primary-200'
                >
                  PayPal Payments
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <motion.div
            variants={itemVariants}
            initial='hidden'
            animate='visible'
            className=' p-6 rounded-xl shadow-sm border border-primary-200'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-primary-600'>Total Earnings</p>
                <p className='text-2xl font-bold mt-2 text-primary-900'>
                  {formatPrice(
                    filteredData.reduce((acc, curr) => acc + curr.amount, 0)
                  )}
                </p>
              </div>
              <LineChart className='h-8 w-8 text-primary-600' />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial='hidden'
            animate='visible'
            className=' p-6 rounded-xl shadow-sm border border-primary-200'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-primary-600'>Total Transactions</p>
                <p className='text-2xl font-bold mt-2 text-primary-900'>
                  {filteredData.length}
                </p>
              </div>
              <WalletCards className='h-8 w-8 text-primary-600' />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial='hidden'
            animate='visible'
            className=' p-6 rounded-xl shadow-sm border border-primary-200'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-primary-600'>Average Payment</p>
                <p className='text-2xl font-bold mt-2 text-primary-900'>
                  {formatPrice(
                    filteredData.length > 0
                      ? filteredData.reduce(
                          (acc, curr) => acc + curr.amount,
                          0
                        ) / filteredData.length
                      : 0
                  )}
                </p>
              </div>
              <Receipt className='h-8 w-8 text-primary-600' />
            </div>
          </motion.div>
        </div>

        {/* Transactions Table */}
        <div className=' rounded-xl shadow-sm border border-primary-200 overflow-hidden'>
          <Table className='w-full'>
            <TableHeader className='bg-primary-200'>
              <TableRow>
                <TableHead className='w-[200px] text-primary-800'>
                  Date
                </TableHead>
                <TableHead className='text-primary-800'>
                  Payment Method
                </TableHead>
                <TableHead className='text-right text-primary-800'>
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <AnimatePresence>
                {isLoadingTransactions ? (
                  <TableRow>
                    <TableCell colSpan={3} className='h-24 text-center'>
                      <Loading />
                    </TableCell>
                  </TableRow>
                ) : filteredData.length > 0 ? (
                  filteredData.map((transaction) => (
                    <motion.tr
                      key={transaction.transactionId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='hover:bg-primary-50 transition-colors'
                    >
                      <TableCell className='font-medium text-primary-900'>
                        {new Date(transaction.dateTime).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.paymentProvider === 'stripe'
                              ? 'default'
                              : 'secondary'
                          }
                          className='capitalize bg-primary-200 text-primary-900 hover:bg-primary-300'
                        >
                          {transaction.paymentProvider}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right font-semibold text-primary-700'>
                        {formatPrice(transaction.amount)}
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className='h-24 text-center text-primary-500'
                    >
                      <div className='flex flex-col items-center gap-2 py-8'>
                        <WalletCards className='h-12 w-12 text-primary-300' />
                        <p>No transactions found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherBilling;
