import React, { useState } from 'react'
import { Package, PlusCircle, Warehouse } from 'lucide-react'
import Dashboard from './components/Dashboard'
import InventoryList from './components/InventoryList'
import AddItemForm from './components/AddItemForm'
import ExcelActions from './components/ExcelActions'

export interface Item {
  id: number
  name: string
  quantity: number
  location: string
}

function App() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: '笔记本电脑', quantity: 50, location: 'A1' },
    { id: 2, name: '智能手机', quantity: 100, location: 'B2' },
    { id: 3, name: '平板电脑', quantity: 30, location: 'C3' },
  ])

  const addItem = (newItem: Omit<Item, 'id'>) => {
    setItems([...items, { ...newItem, id: items.length + 1 }])
  }

  const importItems = (importedItems: Item[]) => {
    const newItems = importedItems.map((item, index) => ({
      ...item,
      id: items.length + index + 1,
    }))
    setItems([...items, ...newItems])
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Warehouse className="mr-2" />
          <h1 className="text-2xl font-bold">仓库管理系统</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Dashboard items={items} />
        <ExcelActions items={items} onImport={importItems} />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Package className="mr-2" />
              库存列表
            </h2>
            <InventoryList items={items} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <PlusCircle className="mr-2" />
              添加新物品
            </h2>
            <AddItemForm onAddItem={addItem} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App