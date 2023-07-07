import { PageContainer } from '@/components/PageContainer/PageContainer';
import { PaginationTable } from '@/components/Table/PaginationTable';
import { SimpleTable } from '@/components/Table/SimpleTable';
import { Space } from '@mantine/core';

export default function TablePage() {
	return (
		<PageContainer title="Register Category">
			<SimpleTable />
			<PaginationTable />
		</PageContainer>
	);
}
