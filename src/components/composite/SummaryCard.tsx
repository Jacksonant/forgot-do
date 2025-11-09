import { PieChart } from './PieChart'
import './SummaryCard.css'

interface SummaryCardProps {
  title?: string
  type: 'percentage' | 'list' | 'chart'
  data?: {
    value?: number
    total?: number
    items?: Array<{ text: string; completed?: boolean }>
  }
}

export const SummaryCard = ({ title, type, data }: SummaryCardProps) => {
  return (
    <div className="summary-card" role="region" aria-label={title || 'Summary card'}>
      {title && <h3 className="summary-card-title">{title}</h3>}
      {type === 'percentage' && data && (
        <div className="summary-card-percentage" role="status" aria-label={`${data.value} of ${data.total} tasks completed`}>
          <span className="summary-card-value">{data.value}</span>
          <span className="summary-card-total">/ {data.total}</span>
        </div>
      )}
      {type === 'list' && data?.items && (
        <ul className="summary-card-list" role="list" aria-label="Latest created tasks">
          {data.items.map((item, index) => (
            <li 
              key={index} 
              className={`summary-card-list-item ${item.completed ? 'completed' : ''}`}
              role="listitem-summary"
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
      {type === 'chart' && data && (
        <PieChart completed={data.value || 0} total={data.total || 0} />
      )}
    </div>
  )
}
