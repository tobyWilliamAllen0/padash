'use client';

import Sidebar from '@/components/Sidebar';
import useFetch from '@/hooks/useFetch';
import { useEffect, useState } from 'react';
import {
	Form,
	Input,
	InputNumber,
	Popconfirm,
	Table,
	Typography,
	Select,
	Button,
	Modal,
} from 'antd';
import withAdminAuth from '@/components/withAdminAuth';

function Users() {
	const [tableParams, setTableParams] = useState({
		current: 1,
		pageSize: 10,
	});

	const [usersState, fetchUsers] = useFetch();
	const [downloadUsersState, fetchDownloadUsers] = useFetch();

	useEffect(() => {
		fetchUsers({
			url: `admin/user?pg=${tableParams.current}&lm=${tableParams.pageSize}`,
			method: 'GET',
		});
	}, []);

	const downloadUsers = () => {
		fetchDownloadUsers({
			url: `admin/user?pg=${tableParams.current}&lm=${tableParams.pageSize}&csv=true`,
			method: 'GET',
		});
	};

	const downloadCSV = (data: any[], filename: string = 'users_export.csv') => {
		// If no data, return early
		if (!data) {
			console.warn('No data to export');
			return;
		}

		let csvContent: string;

		// Handle case where data is already a CSV string
		if (typeof data === 'string') {
			csvContent = data;
		}
		// Handle case where data is an array of objects
		else if (Array.isArray(data) && data.length > 0) {
			// Get headers from the first object's keys
			const headers = Object.keys(data[0]);

			// Create CSV header row
			csvContent = headers.join(',') + '\n';

			// Add data rows
			data.forEach((item) => {
				const row = headers
					.map((header) => {
						// Handle values that might contain commas or quotes
						let value = item[header]?.toString() || '';
						if (
							value.includes(',') ||
							value.includes('"') ||
							value.includes('\n')
						) {
							value = `"${value.replace(/"/g, '""')}"`;
						}
						return value;
					})
					.join(',');
				csvContent += row + '\n';
			});
		} else {
			console.warn('Invalid data format for CSV export');
			return;
		}

		// Create a Blob with the CSV content
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

		// Create a download link
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('download', filename);
		link.style.visibility = 'hidden';

		// Add to DOM, trigger click and remove
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const columns = [
		{
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
			editable: false,
			inputType: 'text',
		},
		{
			title: 'First Name',
			dataIndex: 'first_name',
			key: 'first_name',
			editable: false,
		},
		{
			title: 'Last Name',
			dataIndex: 'last_name',
			key: 'last_name',
			editable: false,
		},
		{
			title: 'Mobile Number',
			dataIndex: 'mobile_number',
			key: 'mobile_number',
			editable: false,
		},
		{
			title: 'Referral Code',
			dataIndex: 'referral_code',
			key: 'referral_code',
			editable: false,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			editable: false,
		},
		{
			title: 'Total Score',
			dataIndex: 'total_scores',
			key: 'total_scores',
			editable: false,
		},
	];

	useEffect(() => {
		if (downloadUsersState?.response) {
			downloadCSV(downloadUsersState.response);
		}
	}, [downloadUsersState]);

	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex flex-col p-4 gap-6 w-full h-screen">
				<Button
					type="primary"
					className="w-fit"
					onClick={downloadUsers}
					loading={downloadUsersState?.isLoading}
				>
					Download
				</Button>
				<Table
					className="w-full h-full p-4"
					rowClassName="editable-row"
					dataSource={usersState?.response ?? []}
					columns={columns}
					pagination={tableParams}
					loading={usersState?.isLoading}
				/>
			</div>
		</div>
	);
}

export default withAdminAuth(Users);
