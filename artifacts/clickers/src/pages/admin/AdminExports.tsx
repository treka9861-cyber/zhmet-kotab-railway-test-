import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, BookOpen, Users, ShoppingBag, BarChart3 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { AdminLayout, AdminPageHeader } from '@/components/admin/AdminLayout';
import { useBooks, useAuthors, useAllOrders, useAnalytics } from '@/services/supabase.hooks';
import { format } from 'date-fns';

type ExportType = 'books' | 'authors' | 'orders' | 'sales';

interface ExportCard {
  type: ExportType;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

const exportCards: ExportCard[] = [
  { type: 'books', title: 'Books Catalog', description: 'All books with pricing, format, author, and status', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
  { type: 'authors', title: 'Authors List', description: 'Author profiles with social media and bio', icon: Users, color: 'bg-purple-50 text-purple-600' },
  { type: 'orders', title: 'Orders Report', description: 'All orders with customer, status, and total amount', icon: ShoppingBag, color: 'bg-green-50 text-green-600' },
  { type: 'sales', title: 'Sales Analytics', description: 'Daily sales revenue and order counts', icon: BarChart3, color: 'bg-amber-50 text-amber-600' },
];

function downloadExcel(data: Record<string, unknown>[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');

  // Style the header row
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cell = XLSX.utils.encode_cell({ r: 0, c });
    if (ws[cell]) {
      ws[cell].s = {
        fill: { fgColor: { rgb: '8B1D3D' } },
        font: { bold: true, color: { rgb: 'FFFFFF' } },
      };
    }
  }

  XLSX.writeFile(wb, `${filename}_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
}

export function AdminExports() {
  const { data: books } = useBooks({ status: undefined });
  const { data: authors } = useAuthors();
  const { data: orders } = useAllOrders();
  const { data: analytics } = useAnalytics();

  const handleExport = (type: ExportType) => {
    switch (type) {
      case 'books': {
        const rows = (books ?? []).map((b) => ({
          'ID': b.id,
          'Arabic Title': b.title_ar,
          'English Title': b.title_en,
          'Genre': b.genre,
          'Format': b.format,
          'Price (EGP)': b.price,
          'Original Price': b.original_price || '',
          'Pages': b.pages,
          'Status': b.status,
          'Featured': b.is_featured ? 'Yes' : 'No',
          'New': b.is_new ? 'Yes' : 'No',
          'Rating': b.rating,
          'Reviews': b.review_count,
          'Published Date': b.published_date,
        }));
        downloadExcel(rows, 'books_catalog');
        break;
      }
      case 'authors': {
        const rows = (authors ?? []).map((a) => ({
          'ID': a.id,
          'Arabic Name': a.name_ar,
          'English Name': a.name_en,
          'Nationality': a.nationality || '',
          'Instagram': a.instagram || '',
          'Twitter': a.twitter || '',
          'Website': a.website || '',
          'Created': format(new Date(a.created_at), 'yyyy-MM-dd'),
        }));
        downloadExcel(rows, 'authors_list');
        break;
      }
      case 'orders': {
        const rows = (orders ?? []).map((o) => ({
          'Order ID': o.id,
          'Customer Email': (o as Record<string, unknown> & { profiles?: { email: string } }).profiles?.email || '',
          'Customer Name': (o as Record<string, unknown> & { profiles?: { full_name?: string } }).profiles?.full_name || '',
          'Status': o.status,
          'Total (EGP)': o.total_amount,
          'Payment Method': o.payment_method || '',
          'Items Count': ((o as Record<string, unknown> & { order_items?: unknown[] }).order_items as unknown[])?.length || 0,
          'Date': format(new Date(o.created_at), 'yyyy-MM-dd HH:mm'),
        }));
        downloadExcel(rows, 'orders_report');
        break;
      }
      case 'sales': {
        const rows = (analytics?.salesByDay ?? []).map((d) => ({
          'Date': format(new Date((d as { sale_date: string }).sale_date), 'yyyy-MM-dd'),
          'Orders': (d as { order_count: number }).order_count,
          'Revenue (EGP)': Number((d as { revenue: number }).revenue).toFixed(2),
          'Unique Customers': (d as { unique_customers: number }).unique_customers,
        }));
        downloadExcel(rows, 'sales_analytics');
        break;
      }
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Export Reports"
        subtitle="Download platform data as Excel spreadsheets for analysis"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exportCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.type}
              className="bg-white rounded-3xl border border-border p-8 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => handleExport(card.type)}
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                  <Icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-primary font-cinematic mb-2">{card.title}</h3>
                  <p className="text-primary/50 font-bold text-sm leading-relaxed mb-6">{card.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-wider group-hover:bg-accent group-hover:text-primary transition-all">
                      <Download size={14} />
                      <span>Download Excel</span>
                    </div>
                    <FileSpreadsheet size={16} className="text-green-500" />
                    <span className="text-green-600 font-bold text-xs">.xlsx</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 bg-primary/5 border border-primary/10 rounded-3xl p-8">
        <h3 className="text-lg font-black text-primary font-cinematic mb-3">📊 Tips for Using Reports</h3>
        <ul className="space-y-2 text-primary/60 font-bold text-sm">
          <li>• Reports are generated instantly from live database data</li>
          <li>• Files are formatted with the Dar Zahmet Kotab brand colors</li>
          <li>• Open with Microsoft Excel, Google Sheets, or LibreOffice</li>
          <li>• Sales report includes the past 30 days by default</li>
          <li>• All prices are in Egyptian Pound (EGP)</li>
        </ul>
      </div>
    </AdminLayout>
  );
}
