import React, { useState } from 'react';

interface TabProps {
	tabs: { label: string; content: React.ReactNode }[];
}

const Tab: React.FC<TabProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<div className="flex rounded-lg bg-[#151515]">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`flex items-center justify-center py-2 px-4 basis-1/3 ${
							activeTab === index ? 'bg-white rounded-lg text-[#151515]' : 'text-white'
						}`}
						onClick={() => setActiveTab(index)}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className="mt-4">{tabs[activeTab].content}</div>
		</div>
	);
};

export default Tab;
