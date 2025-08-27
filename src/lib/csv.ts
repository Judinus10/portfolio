import Papa from 'papaparse';
import type { Transaction } from './brand';

export const exportTransactionsToCSV = (transactions: Transaction[], filename = 'transactions.csv') => {
  const csvData = transactions.map(tx => ({
    'Transaction ID': tx.id,
    'Description': tx.description,
    'Amount': tx.amount,
    'Status': tx.status,
    'Date': tx.date
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};