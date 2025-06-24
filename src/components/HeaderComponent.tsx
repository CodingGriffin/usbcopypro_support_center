import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const HeaderComponent: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);
		
		if (newDarkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	};

	return (
		<div className="mb-8 text-center relative">
			{/* Dark Mode Toggle */}
			<div className="absolute top-0 right-0">
				<button
					onClick={toggleDarkMode}
					className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
					aria-label="Toggle dark mode"
				>
					<div className="relative w-6 h-6">
						<Sun 
							size={24} 
							className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${
								isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
							}`} 
						/>
						<Moon 
							size={24} 
							className={`absolute inset-0 text-blue-400 transition-all duration-300 ${
								isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
							}`} 
						/>
					</div>
				</button>
			</div>

			<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Support Center</h1>
			<p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">Troubleshooting guide for drive application issues</p>
		</div>
	)
}

export default HeaderComponent;