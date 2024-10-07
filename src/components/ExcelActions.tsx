import React from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Item } from '../App'
import { FileUp, FileDown, FileText } from 'lucide-react'

interface ExcelActionsProps {
  items: Item[]
  onImport: (items: Item[]) => void
}

const ExcelActions: React.FC<ExcelActionsProps> = ({ items, onImport }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(items)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '库存')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(data, '库存.xlsx')
  }

  const importFromExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Item[]
        onImport(jsonData)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const downloadTemplate = () => {
    const template: Omit<Item, 'id'>[] = [
      { name: '示例物品', quantity: 0, location: 'A1' }
    ]
    const worksheet = XLSX.utils.json_to_sheet(template)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '模板')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(data, '库存模板.xlsx')
  }

  return (
    <div className="flex flex-wrap space-x-4 mb-4">
      <button
        onClick={exportToExcel}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center mb-2"
      >
        <FileDown className="mr-2" />
        导出到Excel
      </button>
      <label className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded cursor-pointer flex items-center mb-2">
        <FileUp className="mr-2" />
        从Excel导入
        <input type="file" accept=".xlsx, .xls" onChange={importFromExcel} className="hidden" />
      </label>
      <button
        onClick={downloadTemplate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mb-2"
      >
        <FileText className="mr-2" />
        下载模板
      </button>
    </div>
  )
}

export default ExcelActions