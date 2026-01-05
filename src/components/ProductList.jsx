import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, ChevronDown, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ProductDetail from './ProductDetail';
import { products } from '../data';

const uniqueCategories = ['All Categories', ...new Set(products.map(p => p.category))];
const statusOptions = ['All Statuses', 'Draft', 'Submitted', 'Published'];

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All Products');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const catRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (catRef.current && !catRef.current.contains(event.target)) setIsCatOpen(false);
      if (statusRef.current && !statusRef.current.contains(event.target)) setIsStatusOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesTab = true;
      if (activeTab === 'Drafts') matchesTab = product.status === 'Draft';
      if (activeTab === 'Archived') matchesTab = product.status === 'Published';

      const matchesCategory =
        categoryFilter === 'All Categories' || product.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'All Statuses' || product.status === statusFilter;

      return matchesSearch && matchesTab && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="h-screen w-full bg-[#F3F5F7] font-sans text-slate-800 flex flex-col overflow-hidden">
      <header className="px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">H</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">HEDAMO</span>
        </div>

        <div className="flex-1 max-w-xl mx-12">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-slate-100/50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm shadow-blue-200 active:scale-95">
          <Plus size={18} />
          Add Product
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col py-6 shrink-0 z-10">
          <div className="px-6 mb-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Menu
            </div>
          </div>

          <nav className="space-y-0.5 px-3">
            {['All Products', 'Drafts', 'Archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC] relative">
          <div className="px-8 py-6 pb-4">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {activeTab} Interface
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Manage and view your {activeTab.toLowerCase()}.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative" ref={catRef}>
                <button
                  onClick={() => setIsCatOpen(!isCatOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    categoryFilter !== 'All Categories'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {categoryFilter}
                  <ChevronDown
                    size={14}
                    className={`text-slate-500 transition-transform ${
                      isCatOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isCatOpen && (
                  <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-30">
                    {uniqueCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategoryFilter(cat);
                          setIsCatOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                      >
                        {cat}
                        {categoryFilter === cat && (
                          <Check size={14} className="text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={statusRef}>
                <button
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    statusFilter !== 'All Statuses'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {statusFilter}
                  <ChevronDown
                    size={14}
                    className={`text-slate-500 transition-transform ${
                      isStatusOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isStatusOpen && (
                  <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-30">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setIsStatusOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                      >
                        {status}
                        {statusFilter === status && (
                          <Check size={14} className="text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1" />

              <button
                onClick={() =>
                  setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
                }
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-600 transition-colors"
              >
                Sort by: Last Updated {sortOrder === 'desc' ? '(Newest)' : '(Oldest)'}
                <ChevronDown size={14} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto px-8 pb-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-w-[800px]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      Product
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      Producer
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right border-b border-slate-100">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="hover:bg-blue-50/30 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-md bg-slate-200 border border-slate-300 overflow-hidden">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                                  IMG
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">
                                {product.name}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {product.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {product.category}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-900">
                            {product.producer}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {product.lastUpdated}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <StatusBadge status={product.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <Search size={20} className="text-slate-300" />
                          <p>No products found matching your filters.</p>
                          <button
                            onClick={() => {
                              setCategoryFilter('All Categories');
                              setStatusFilter('All Statuses');
                              setSearchTerm('');
                              setActiveTab('All Products');
                            }}
                            className="text-blue-600 text-sm font-medium hover:underline"
                          >
                            Clear all filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30 text-sm text-slate-500">
                <span>Showing {filteredProducts.length} entries</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
