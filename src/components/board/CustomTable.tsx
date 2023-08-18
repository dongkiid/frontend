import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import dummy from "data/dummy.json";
import TablePaginationActions from './TablePaging';
import { Button } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: 16,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));


interface CustomTableProps {
    category: string;
}

const CustomTable: React.FC<CustomTableProps> = ({ category }) => {
    const rows = dummy.data.filter((item) => item.category === category)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>

            <TableContainer sx={{ display: 'flex', justifyContent: 'center', mx: 4 }}>

                <Table sx={{ minWidth: 200, width: 1000, }} >
                    <TableHead >
                        <TableRow >
                                <TableCell colSpan={4}>
                                <Button variant="text" href='/board/BoardForm'>
                                    글 쓰러가기
                                </Button>
                                </TableCell>

                        </TableRow>
                        <TableRow >
                            <StyledTableCell sx={{width:'10%'}}align="center">글번호</StyledTableCell>
                            <StyledTableCell sx={{width:'60%'}} align="center">제목</StyledTableCell>
                            <StyledTableCell sx={{width:'20%'}} align="center">작성자</StyledTableCell>
                            <StyledTableCell sx={{width:'10%'}} align="center">조회수</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow hover key={row.id}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left" component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="center" >
                                    {row.userId}
                                </TableCell>
                                <TableCell align="center" >
                                    {row.userId}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter >
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25]}
                                colSpan={4}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default CustomTable;