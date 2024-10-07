import React from 'react'
import { BarChart, Package, TrendingUp } from 'lucide-react'
import { Item } from '../App'

interface DashboardProps {
  items: Item[]
}

const Dashboard: React.FC<DashboardProps> = ({ items }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const uniqueItems = items.length
  const lowStockItems = items.filter((item) => item.quantity < 10).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <Package className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold">总物品数量</h3>
        </div>
        <p className="text-3xl font-bold mt-2">{totalItems}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <BarChart className="text-green-500 mr-2" />
          <h3 className="text-lg font-semibold">不同物品种类</h3>
        </div>
        <p className="text-3xl font-bold mt-2">{uniqueItems}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <TrendingUp className="text-red-500 mr-2" />
          <h3 className="text-lg font-semibold">低库存物品</h3>
        </div>
        <p className="text-3xl font-bold mt-2">{lowStockItems}</p>
      </div>
    </div>
  )
}

export default Dashboard