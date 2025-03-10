'use client';

import Sidebar from '@/components/Sidebar';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
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
import type { TableProps } from 'antd';

interface DataType {
	active_time: string;
	answer: number;
	answered_count: number;
	createdAt: string;
	options: string[];
	question: string;
	_id: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: 'number' | 'text' | 'tags';
	record: DataType;
	index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode =
		inputType === 'tags' ? (
			<Select
				mode="tags"
				placeholder="Options"
				options={record.options.map((tag) => ({
					label: tag,
					value: tag,
				}))}
			/>
		) : inputType === 'number' ? (
			<InputNumber />
		) : (
			<Input />
		);

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{ margin: 0 }}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

export default function Users() {
	const [tableParams, setTableParams] = useState({
		current: 1,
		pageSize: 10,
	});
	const [editingKey, setEditingKey] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [SocialState, fetchSocial] = useFetch();
	const [deleteSocialState, deleteSocial] = useFetch({
		onSuccess: () => {
			fetchSocial({
				url: `/admin/social?pg=${tableParams.current}&lm=${tableParams.pageSize}`,
				method: 'GET',
			});
		},
	});
	const [editSocialState, editSocial] = useFetch();
	const [addSocialtate, addSocial] = useFetch({
		onSuccess: () => {
			fetchSocial({
				url: `/admin/social?pg=${tableParams.current}&lm=${tableParams.pageSize}`,
				method: 'GET',
			});
			setIsModalOpen(false);
		},
	});
	const [form] = Form.useForm();

	const isEditing = (record: DataType) => record._id === editingKey;

	const edit = (record: Partial<DataType> & { _id: React.Key }) => {
		form.setFieldsValue({ ...record });
		setEditingKey(record._id);
	};

	const cancel = () => {
		setEditingKey('');
	};
	const deleteRow = (id: string) => {
		deleteSocial({
			url: `/admin/social/${id}`,
			method: 'DELETE',
		});
	};

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as DataType;
			editSocial({
				url: `/admin/social/${key}`,
				method: 'PATCH',
				data: row,
			});
			setEditingKey('');
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		try {
			const row = (await form.validateFields()) as DataType;

			addSocial({
				url: '/admin/social',
				method: 'POST',
				data: row,
			});
		} catch (e) {}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		fetchSocial({
			url: `/admin/social?pg=${tableParams.current}&lm=${tableParams.pageSize}`,
			method: 'GET',
		});
	}, []);

	const columns = [
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			editable: true,
			inputType: 'text',
		},
		{
			title: 'URL',
			dataIndex: 'url',
			key: 'url',
			editable: true,
		},
		{
			title: 'Social User Name',
			dataIndex: 'social_user_name',
			key: 'social_user_name',
			editable: true,
		},
		{
			title: 'Actions',
			width: 180,
			render: (_: any, record: DataType) => {
				const editable = isEditing(record);
				return (
					<div className="flex flex-row gap-2 w-[180px]">
						{editable ? (
							<span className="flex flex-row gap-2 ">
								<Typography.Link
									onClick={() => save(record._id)}
									style={{ marginInlineEnd: 8 }}
								>
									Save
								</Typography.Link>
								<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
									<a>Cancel</a>
								</Popconfirm>
							</span>
						) : (
							<Typography.Link
								disabled={editingKey !== ''}
								onClick={() => edit(record)}
							>
								Edit
							</Typography.Link>
						)}
						<span className="font-medium cursor-pointer text-red-700">
							<Popconfirm
								title="Sure to cancel?"
								onConfirm={() => deleteRow(record._id)}
							>
								<a>Delete</a>
							</Popconfirm>
						</span>
					</div>
				);
			},
		},
	];

	const mergedColumns: TableProps<DataType>['columns'] = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: DataType) => ({
				record,
				inputType: col.inputType ? col.inputType : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex flex-col p-4 gap-6 w-full h-screen">
				<Button type="primary" className="w-fit" onClick={showModal}>
					Add Social
				</Button>
				<Modal
					title="Add Question"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okButtonProps={{ loading: addSocialtate.isLoading }}
				>
					<Form form={form} component={false}>
						<Form.Item
							name="type"
							style={{ margin: 0, paddingTop: 16 }}
							rules={[
								{
									required: true,
									message: `Please Input Type!`,
								},
							]}
						>
							<Input placeholder="Type" />
						</Form.Item>

						<Form.Item
							name="url"
							style={{ margin: 0, paddingTop: 16 }}
							rules={[
								{
									required: true,
									message: `Please Input URL!`,
								},
							]}
						>
							<Input placeholder="URL" />
						</Form.Item>
						<Form.Item
							name="social_user_name"
							style={{ margin: 0, paddingTop: 16 }}
							rules={[
								{
									required: true,
									message: `Please Input Social User Name!`,
								},
							]}
						>
							<Input placeholder="Social User Name" />
						</Form.Item>
					</Form>
				</Modal>
				<Form form={form} component={false}>
					<Table
						components={{
							body: { cell: EditableCell },
						}}
						className="w-full h-full p-4"
						rowClassName="editable-row"
						dataSource={SocialState?.response ?? []}
						columns={mergedColumns}
						pagination={tableParams}
						loading={SocialState?.isLoading}
					/>
				</Form>
			</div>
		</div>
	);
}
