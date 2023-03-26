import debounce from 'lodash.debounce';
import { CSSProperties, useState } from 'react';
import { Container, Form, Pagination } from 'react-bootstrap';

type Props = {
    style?: CSSProperties
    page: number
    pageSize: number
    totalItems: number
    pageSizeOptions: number[]
    onPageSizeChange: any
    onPageChange: any
};

export default function CustomPagination(props: Props) {
    const [currentPage, setCurrentPage] = useState<number>(props.page);

    const handlePageChanged = debounce((newPage: number) => {
        if (newPage < 0) return;
        props.onPageChange(newPage);
        setCurrentPage(newPage);
    }, 300)

    const PaginationWithoutTotalPageCount = () => {
        let hasNextPage = props.totalItems > props.pageSize; // We get 1 more than page size to determine if we have an extra page

        return (
            <Container fluid className="p-0 m-0" style={{ display: "flex" }}>
                <Container className="p-0 m-0 col-6" style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                    <div style={{ display: "inline-block" }}>
                        <span className="mx-2">
                            Page{" "}
                            <strong>
                                {currentPage}
                            </strong>
                        </span>
                    </div>

                    <div style={{ display: "inline-block" }}>
                        <span className="ms-3 me-2">Show:</span>
                        <Form.Select
                            className="d-inline-block w-auto"
                            value={props.pageSize}
                            onChange={(e: any) => {
                                props.onPageSizeChange(Number(e.target.value));
                            }}
                        >
                            {props.pageSizeOptions.map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div style={{ display: "inline-block" }}>
                        <span className="ms-3 me-2">Go to page:</span>
                        <Form.Control
                            className="d-inline-block"
                            type="number"
                            defaultValue={currentPage}
                            onChange={(e: any) => {
                                const page = e.target.value != null ? Number(e.target.value) : 1;
                                handlePageChanged(page);
                            }}
                            style={{ width: "75px" }}
                        />
                    </div>
                </Container>
                <Container fluid className="p-0 m-0 col-6" style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                    <Pagination className="p-0 m-0" style={{ display: "flex", alignItems: "center" }}>
                        <Pagination.Prev
                            onClick={() => props.onPageChange(props.page - 1)}
                            disabled={!(props.page > 1)}
                        />
                        <Pagination.Next
                            onClick={() => props.onPageChange(props.page + 1)}
                            disabled={!hasNextPage}
                        />
                    </Pagination>
                </Container>
            </Container>
        )
    }

    return (
        <Container fluid className="p-1 m-0" style={props.style}>
            {
                PaginationWithoutTotalPageCount()
            }
        </Container>
    )
}