'use client';

import Loading from '@/components/Loading';
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
import { useState } from 'react';

const UserBilling = () => {
  const [paymentType, setPaymentType] = useState('all');
  const { user, isLoaded } = useUser();
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(user?.id || '', {
      skip: !isLoaded || !user,
    });

  const filteredData =
    transactions?.filter((transaction) => {
      const matchesTypes =
        paymentType === 'all' || transaction.paymentProvider === paymentType;
      return matchesTypes;
    }) || [];

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to view your billing information.</div>;

  return (
    <div className='p-6 bg-customgreys-primarybg min-h-screen'>
      <div className='max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-customgreys-secondarybg'>
        <div className='p-8'>
          <h2 className='text-2xl font-bold text-primary-600 mb-6'>
            Payment History
          </h2>

          {/* Filters Section */}
          <div className='mb-8'>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger className='w-48 border-primary-300 hover:border-primary-400 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>
                <SelectValue placeholder='Payment Type' />
              </SelectTrigger>

              <SelectContent
                className='bg-customgreys-primarybg border border-primary-200 max-h-60 
                          scrollbar-gutter-stable overflow-y-auto 
                          scrollbar-thin scrollbar-track-primary-50 scrollbar-thumb-primary-300 
                          hover:scrollbar-thumb-primary-400'
              >
                <SelectItem
                  className='hover:bg-primary-50 focus:bg-primary-50 text-primary-700 transition-colors pr-6'
                  value='all'
                >
                  All Types
                </SelectItem>
                <SelectItem
                  className='hover:bg-primary-50 focus:bg-primary-50 text-primary-700 transition-colors pr-6'
                  value='stripe'
                >
                  Stripe
                </SelectItem>
                <SelectItem
                  className='hover:bg-primary-50 focus:bg-primary-50 text-primary-700 transition-colors pr-6'
                  value='paypal'
                >
                  Paypal
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <div className='border rounded-lg overflow-hidden border-customgreys-secondarybg'>
            {isLoadingTransactions ? (
              <Loading />
            ) : (
              <Table>
                <TableHeader className='bg-primary-50'>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead className='text-primary-600 font-semibold py-4'>
                      Date
                    </TableHead>
                    <TableHead className='text-primary-600 font-semibold'>
                      Amount
                    </TableHead>
                    <TableHead className='text-primary-600 font-semibold'>
                      Payment Method
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((transaction) => (
                      <TableRow
                        key={transaction.transactionId}
                        className='hover:bg-primary-50/50 border-t border-customgreys-secondarybg transition-colors'
                      >
                        <TableCell className='text-primary-700'>
                          {new Date(transaction.dateTime).toLocaleDateString()}
                        </TableCell>
                        <TableCell className='text-primary-700 font-medium'>
                          {formatPrice(transaction.amount)}
                        </TableCell>
                        <TableCell className='text-primary-700'>
                          <span className='capitalize'>
                            {transaction.paymentProvider}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        className='text-center text-primary-400 py-8'
                        colSpan={3}
                      >
                        No transactions to display
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBilling;
