import {Pagination} from "react-bootstrap";

interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export function CustomPagination({
        totalPages,
        currentPage,
        onPageChange,
    }: CustomPaginationProps
) {

    // Número de páginas visibles alrededor de la actual
    const maxVisible = 5;

    const getPageNumbers = () => {
        let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end >= totalPages) {
            end = totalPages - 1;
            start = Math.max(0, end - maxVisible + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <Pagination>
            <Pagination.First
                onClick={() => onPageChange(0)}
                disabled={currentPage === 0}
            />
            <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            />

            {currentPage > Math.floor(maxVisible / 2) && (
                <>
                    <Pagination.Item onClick={() => onPageChange(0)}>{1}</Pagination.Item>
                    <Pagination.Ellipsis disabled />
                </>
            )}

            {getPageNumbers().map((page) => (
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page + 1}
                </Pagination.Item>
            ))}

            {currentPage < totalPages - Math.ceil(maxVisible / 2) - 1 && (
                <>
                    <Pagination.Ellipsis disabled />
                    <Pagination.Item onClick={() => onPageChange(totalPages - 1)}>
                        {totalPages}
                    </Pagination.Item>
                </>
            )}

            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            />
            <Pagination.Last
                onClick={() => onPageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
            />
        </Pagination>
    );
}