import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Download, CheckCircle, Loader2 } from 'lucide-react';

import actions from "../states/UsbCopyUpdates/actions";

const UpdateCheckerComponent: React.FC = () => {
	const [updateStatus, setUpdateStatus] = useState<'checking' | 'available' | 'up-to-date' | null>(null);
  const dispatch = useDispatch();

  const {
    updatable,
  } = useSelector((state: any) => state.usbcopyUpdates);

	useEffect(() => {
		console.log(updatable)
    updatable.data != undefined ? setUpdateStatus(updatable.data ? 'available' : 'up-to-date') : '';
	}, [updatable]);

  const checkForUpdates = async () => {
    setUpdateStatus('checking');
		const url = new URL(window.location.href);
    
    // Set or update the query parameter
    const jobNum = url.searchParams.get('j');
    const verNum = url.searchParams.get('v');
    const vid = url.searchParams.get('vid');
    const pid = url.searchParams.get('pid');
    const os = url.searchParams.get('os');
    const updatedAt = url.searchParams.get('updatedAt');

    // Simulate API call
		console.log(jobNum, verNum, vid, pid, os, updatedAt);
		dispatch({
      type: actions.CHECK_UPDATES,
      payload: {
				mode: "getUpdatingInfo",
				ver_num: verNum,
				job_number: jobNum,
				os_type: os,
				updatedAt: updatedAt
      }
    });
    // Randomly show updates available or up-to-date
  };

  const openUpdateWindow = () => {
    window.open(updatable.data.file_url, '_blank');
  };
	
	return (
		<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Updates</h3>
				<Download size={24} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
			</div>
			
			{updateStatus === null && (
				<button
					onClick={checkForUpdates}
					className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 font-medium"
				>
					Check for Updates
				</button>
			)}
			
			{updateStatus === 'checking' && (
				<div className="flex items-center justify-center py-3">
					<Loader2 className="animate-spin mr-2 text-gray-600 dark:text-gray-300" size={20} />
					<span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Checking...</span>
				</div>
			)}
			
			{updateStatus === 'available' && (
				<div className="space-y-3">
					<div className="flex items-center text-green-600 dark:text-green-400 transition-colors duration-300">
						<CheckCircle size={20} className="mr-2" />
						<span>Updates available!</span>
					</div>
					<button
						onClick={openUpdateWindow}
						className="w-full bg-green-500 dark:bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200 flex items-center justify-center font-medium"
					>
						View Updates
						<Download size={16} className="ml-2" />
					</button>
				</div>
			)}
			
			{updateStatus === 'up-to-date' && (
				<div className="flex items-center text-gray-600 dark:text-gray-300 py-2 transition-colors duration-300">
					<CheckCircle size={20} className="mr-2" />
					<span>You're up to date!</span>
				</div>
			)}
		</div>
	)
}

export default UpdateCheckerComponent;