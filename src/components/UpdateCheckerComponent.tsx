import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Download, CheckCircle, Loader2, X, Mail } from 'lucide-react';

import actions from "../states/UsbCopyUpdates/actions";

const UpdateCheckerComponent: React.FC = () => {
  const [updateStatus, setUpdateStatus] = useState<'checking' | 'available' | 'up-to-date' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState(false);
  const [includeDiagnostics, setIncludeDiagnostics] = useState(false);
  const [email, setEmail] = useState('');
  const [modalUpdateStatus, setModalUpdateStatus] = useState<'idle' | 'checking' | 'completed' | null>('idle');
  const dispatch = useDispatch();
  const {
    updatable,
	global_updatable,
	global_loading
  } = useSelector((state: any) => state.usbcopyUpdates);

	useEffect(() => {
		console.log(global_updatable)
    if (global_updatable.data !== undefined) {
		if(flag == true) setShowModal(true);
      // Check if data is an array with items or a truthy value
      const hasUpdates = Array.isArray(global_updatable.data)
        ? global_updatable.data.length > 0
        : !!global_updatable.data;
      setUpdateStatus(hasUpdates ? 'available' : 'up-to-date');
    }

    // Handle modal update status
    if (showModal && updatable.data !== undefined) {
      setModalUpdateStatus('completed');
    }
	}, [updatable, showModal, global_updatable]);

  const openUpdateModal = () => {
	setUpdateStatus('checking')
	const url = new URL(window.location.href);

    // Set or update the query parameter
    const jobNum = url.searchParams.get('j');
    const verNum = url.searchParams.get('v');
    const vid = url.searchParams.get('vid');
    const pid = url.searchParams.get('pid');
    const os = url.searchParams.get('os');
    const updatedAt = url.searchParams.get('updatedAt');

    // Prepare payload
    let payload: any = {
      mode: "getUpdatingInfo",
      ver_num: verNum,
      job_number: jobNum,
      os_type: os,
      updatedAt: updatedAt
    };

    console.log(jobNum, verNum, vid, pid, os, updatedAt, payload);
	dispatch({
      type: actions.CHECK_GLOBAL_UPDATES,
      payload: payload
    });
    setFlag(true);
    setModalUpdateStatus('idle');
  };

  const checkForUpdatesInModal = async () => {
    if (includeDiagnostics && email.trim()) {
		setModalUpdateStatus('checking');
		const url = new URL(window.location.href);

		// Set or update the query parameter
		const jobNum = url.searchParams.get('j');
		const verNum = url.searchParams.get('v');
		const vid = url.searchParams.get('vid');
		const pid = url.searchParams.get('pid');
		const os = url.searchParams.get('os');
		const updatedAt = url.searchParams.get('updatedAt');

		// Prepare payload
		let payload: any = {
		mode: "getUpdatingInfo",
		ver_num: verNum,
		job_number: jobNum,
		os_type: os,
		updatedAt: updatedAt
		};

		// If diagnostics are included and email is provided, add them to payload
		payload = {
			...payload,
			includeDiagnostics: true,
			email: email.trim()
		};

		console.log(jobNum, verNum, vid, pid, os, updatedAt, payload);
		dispatch({
		type: actions.CHECK_UPDATES,
		payload: payload
		});
    }
  };

  const sendEmail = (object_key: any) => {
	const payload = {
      	mode: "sendEmail",
		object_key: object_key,
		email: email.trim()
	};

	dispatch({
      type: actions.SEND_EMAIL,
      payload: payload
    });
  }

  const openUpdateWindow = () => {
    if (Array.isArray(updatable.data) && updatable.data.length > 0) {
      // Open the first update's URL, or you could open all of them
      window.open(updatable.data[0].file_url || updatable.data[0].download_url, '_blank');
    } else if (updatable.data && updatable.data.file_url) {
      window.open(updatable.data.file_url, '_blank');
    }
  };
	
	return (
		<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Updates</h3>
				<Download size={24} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
			</div>
			
			{ (
				<button
					onClick={openUpdateModal}
					className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 font-medium"
				>
					{ updateStatus === 'checking' ?
						<div className="flex items-center justify-center">
							<Loader2 className="animate-spin mr-2 text-gray-600 dark:text-gray-300" size={20} />Checking...
						</div>
						: 
						<>Check for Updates</>
					}
				</button>
			)}
			
			{/* {updateStatus === 'checking' && (
				<div className="flex items-center justify-center py-3">
					<Loader2 className="animate-spin mr-2 text-gray-600 dark:text-gray-300" size={20} />
					<span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Checking...</span>
				</div>
			)} */}
			
			{/* {updateStatus === 'available' && (
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
			)} */}

			{/* Update Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Check for Updates</h3>
							<button
								onClick={() => {setShowModal(false); setFlag(false)}}
								className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
							>
								<X size={20} />
							</button>
						</div>

						<div className="space-y-4">
							<div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
								{global_updatable.data && Array.isArray(global_updatable.data) && global_updatable.data.length > 0 ? (
									<div className="space-y-3">
										<div className="flex items-center text-green-600 dark:text-green-400">
											<CheckCircle size={20} className="mr-2" />
											<span className="font-medium">Updates Available!</span>
										</div>
										<div className="space-y-2">
											<p className="text-sm text-gray-600 dark:text-gray-300">
												The following updates are available:
											</p>
											<div className="space-y-2 max-h-60 overflow-y-auto">
												{global_updatable.data.map((update: any, index: number) => (
													<div key={index} className="bg-white dark:bg-gray-800 p-3 rounded border">
														<div className="flex items-center justify-between">
															<div className="flex-1">
																<p className="font-medium text-gray-900 dark:text-white">
																	{update.file_name || update.name || `Update ${index + 1}`}
																</p>
																{update.description && (
																	<p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
																		{update.description}
																	</p>
																)}
																{update.formatted_timestamp && (
																	<p className="text-xs text-gray-400 dark:text-gray-500">
																		Date: {update.formatted_timestamp}
																	</p>
																)}
															</div>
															<button
																onClick={() => window.open(update.file_url || update.download_url, '_blank')}
																className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center ml-3"
															>
																<Download size={14} className="mr-1" />
																Download
															</button>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								) : (
									<div className="flex items-center text-gray-600 dark:text-gray-300">
										<CheckCircle size={20} className="mr-2" />
										<span>You're up to date!</span>
									</div>
								)}
							</div>
							{/* Diagnostics Checkbox */}
							<div className="flex items-start space-x-3">
								<input
									type="checkbox"
									id="diagnostics"
									checked={includeDiagnostics}
									onChange={(e) => setIncludeDiagnostics(e.target.checked)}
									className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label htmlFor="diagnostics" className="text-sm text-gray-700 dark:text-gray-300">
									Find My Update
								</label>
							</div>
							{/* Email Input */}
							{includeDiagnostics && 
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
										Email Address
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
										<input
											type="email"
											id="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											disabled={!includeDiagnostics}
											placeholder="Enter your email address"
											className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
												!includeDiagnostics
													? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
													: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
											} border-gray-300 dark:border-gray-600`}
										/>
									</div>
									<button
										onClick={checkForUpdatesInModal}
										disabled={modalUpdateStatus === 'checking'}
										className="w-full bg-blue-500 dark:bg-blue-600 text-white my-3 py-3 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
									>
										{modalUpdateStatus === 'checking' ? (
											<>
												<Loader2 className="animate-spin mr-2" size={16} />
												Checking...
											</>
										) : (
											'Check for Updates'
										)}
									</button>
								</div>
							}
							{/* Check for Updates Button */}

							{/* Update Results */}
							{modalUpdateStatus === 'completed' && (
								<div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
									{updatable.data && Array.isArray(updatable.data) && updatable.data.length > 0 ? (
										<div className="space-y-3">
											<div className="flex items-center text-green-600 dark:text-green-400">
												<CheckCircle size={20} className="mr-2" />
												<span className="font-medium">Updates Available!</span>
											</div>
											<div className="space-y-2">
												<p className="text-sm text-gray-600 dark:text-gray-300">
													The following updates are available:
												</p>
												<div className="space-y-2 max-h-60 overflow-y-auto">
													{updatable.data.map((update: any, index: number) => (
														<div key={index} className="bg-white dark:bg-gray-800 p-3 rounded border">
															<div className="flex items-center justify-between">
																<div className="flex-1">
																	<p className="font-medium text-gray-900 dark:text-white">
																		{update.file_name || update.name || `Update ${index + 1}`}
																	</p>
																	{update.description && (
																		<p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
																			{update.description}
																		</p>
																	)}
																	{update.formatted_timestamp && (
																		<p className="text-xs text-gray-400 dark:text-gray-500">
																			Date: {update.formatted_timestamp}
																		</p>
																	)}
																</div>
																<button
																	onClick={() => sendEmail(update.object_key)}
																	className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center ml-3"
																>
																	<Mail size={14} className="mr-1" />
																	Send Email
																</button>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									) : (
										<div className="flex items-center text-gray-600 dark:text-gray-300">
											<CheckCircle size={20} className="mr-2" />
											<span>You're up to date!</span>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default UpdateCheckerComponent;