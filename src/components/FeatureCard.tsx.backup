import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-sky-50 hover:border-sky-200 transition-all group">
      <div className="mb-4 p-3 bg-sky-50 rounded-lg w-fit group-hover:bg-sky-100 transition-colors">
        <Icon className="h-6 w-6 text-sky-700" />
      </div>
      <h3 className="text-xl font-semibold text-sky-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;