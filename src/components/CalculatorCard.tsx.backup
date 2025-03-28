import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  type: string;
  category: string;
  extraInfo?: string;
  icon: React.ElementType;
  link: string;
}

function CalculatorCard({ title, description, type, category, extraInfo, icon: Icon, link }: CalculatorCardProps) {
  return (
    <Link to={link} className="calculator-card group">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-50 rounded-lg group-hover:bg-sky-100 transition-colors">
            <Icon className="h-6 w-6 text-sky-700" />
          </div>
          <h3 className="text-2xl font-semibold text-sky-900">{title}</h3>
        </div>
        <span className="category-badge">
          {category}
        </span>
      </div>
      <p className="text-gray-600 mb-4 relative z-10">{description}</p>
      {extraInfo && (
        <p className="text-sm text-gray-500 mb-4 relative z-10">{extraInfo}</p>
      )}
      <div className="flex items-center gap-2 text-sky-700 hover:text-sky-900 font-medium relative group px-4 py-2 rounded-lg transition-all calculate-button">
        Calculate
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

export default CalculatorCard;