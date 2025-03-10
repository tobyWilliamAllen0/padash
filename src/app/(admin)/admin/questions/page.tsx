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
	Tag,
	Select,
	Button,
	Modal,
	DatePicker,
} from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import withAdminAuth from '@/components/withAdminAuth';
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

function Questions() {
	const [tableParams, setTableParams] = useState({
		current: 1,
		pageSize: 10,
	});
	const [editingKey, setEditingKey] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [questionsState, fetchQuestions] = useFetch();
	const [deleteQuestionsState, deleteQuestions] = useFetch({
		onSuccess: () => {
			fetchQuestions({
				url: `/admin/question?pg=${tableParams.current}&lm=${tableParams.pageSize}`,
				method: 'GET',
			});
		},
	});
	const [editQuestionsState, editQuestions] = useFetch();
	const [addQuestionState, addQuestions] = useFetch({
		onSuccess: () => {
			fetchQuestions({
				url: `/admin/question?pg=${tableParams.current}&lm=${tableParams.pageSize}`,
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
	const deleteQuestion = (id: string) => {
		deleteQuestions({
			url: `/admin/question`,
			method: 'DELETE',
			data: {
				ids: [id],
			},
		});
	};

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as DataType;
			editQuestions({
				url: `/admin/question/${key}`,
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

	const handleOk = () => {
		try {
			addQuestions({
				url: '/admin/question',
				method: 'POST',
				data: {
					question: form.getFieldValue('question'),
					options: form.getFieldValue('options'),
					answer: form.getFieldValue('answer'),
					active_time: form.getFieldValue('active_time'),
				},
			});
		} catch (e) {}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		fetchQuestions({
			url: `/admin/question?pg=${tableParams.current}&lm=${tableParams.pageSize}`,
			method: 'GET',
		});
	}, []);

	const columns = [
		{
			title: 'Question',
			dataIndex: 'question',
			key: 'question',
			editable: true,
		},
		{
			title: 'Options',
			dataIndex: 'options',
			key: 'options',
			editable: true,
			inputType: 'tags',
			render: (_: any, { options }: { options: string[] }) => (
				<>
					{options.map((tag) => {
						return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
					})}
				</>
			),
		},
		{
			title: 'Answer',
			dataIndex: 'answer',
			key: 'answer',
			editable: true,
		},
		{
			title: 'Active Time',
			dataIndex: 'active_time',
			key: 'active_time',
			editable: true,
			render: (_: any, { active_time }: { active_time: string }) => (
				<span>{dayjs(active_time).format('DD/MM/YYYY')}</span>
			),
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
								onConfirm={() => deleteQuestion(record._id)}
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
					Add Question
				</Button>
				<Modal
					title="Add Question"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okButtonProps={{ loading: addQuestionState.isLoading }}
				>
					<Form form={form} component={false}>
						<Form.Item
							name="question"
							style={{ margin: 0, paddingTop: 16 }}
							rules={[
								{
									required: true,
									message: `Please Input Question!`,
								},
							]}
						>
							<Input placeholder="Question" />
						</Form.Item>

						<Form.Item
							name="options"
							style={{ margin: 0, paddingTop: 16 }}
							rules={[
								{
									required: true,
									message: `Please Input Question!`,
								},
							]}
						>
							<Select mode="tags" placeholder="Options" options={[]} />
						</Form.Item>
						<Form.Item
							name="answer"
							style={{ margin: 0, paddingTop: 16 }}
							rules={[
								{
									required: true,
									message: `Please Input Answer!`,
								},
							]}
						>
							<Input placeholder="Answer" />
						</Form.Item>
						<Form.Item
							name="active_time"
							style={{ margin: 0, paddingTop: 16 }}
							rules={[
								{
									required: true,
									message: `Please Input Active Time!`,
								},
							]}
						>
							<DatePicker />
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
						dataSource={questionsState?.response ?? []}
						columns={mergedColumns}
						pagination={tableParams}
						loading={questionsState?.isLoading}
					/>
				</Form>
			</div>
		</div>
	);
}
export default withAdminAuth(Questions);
