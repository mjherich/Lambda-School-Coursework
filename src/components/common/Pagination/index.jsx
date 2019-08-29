/* eslint-disable */

/* How To Use */

/*



// Pagination Component takes in two properties
// 1. The Array of Data you want to paginate
// 2. A render prop that maps the paginated data


// set your state
this.state = {
  testArray: [1,2,3,4,5,6,7,8,9,10],
}

 <Pagination dataArray={this.state.testArray} render={function paginatedData(props){
        return (
          <>
          {props.paginatedData.map(function renderPaginatedData(data){
            return <h1>{data}</h1>
          })}
          </>
        )
      }}/>


*/
import React, { useState } from 'react';
import _ from 'lodash';

export default function Pagination({ dataArray, render: Data }) {
    const [pageSize, setPageSize] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = page => {
        setCurrentPage(page);
    };
    const handleNext = (page, pagesCount) => {
        if (pagesCount == page) return;
        setCurrentPage(++page);
    };
    const handlePrev = page => {
        if (page == 1) return;
        setCurrentPage(--page);
    };
    const handleLast = (page, pagesCount) => {
        if (page == pagesCount) return;
        setCurrentPage(pagesCount);
    };
    const handleFirst = page => {
        if (page == 1) return;
        setCurrentPage(1);
    };
    const handleShowCount = size => {
        setPageSize(size);
    };
    const paginatedData = paginate(dataArray, currentPage, pageSize);
    return (
        <div className="container">
            <Data
               
                paginatedData={paginatedData}
                handleShowCount={handleShowCount}
            />
            <PaginationHandler
                totalNumberOfItems={dataArray.length}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleLast={handleLast}
                handleFirst={handleFirst}
                currentPage={currentPage}
            />
        </div>
    );
}

function PaginationHandler(props) {
    const {
        totalNumberOfItems,
        pageSize,
        handlePageChange,
        handleNext,
        handlePrev,
        handleLast,
        handleFirst,
        currentPage,
    } = props;
    const pagesCount = Math.ceil(totalNumberOfItems / pageSize);
    const pages = _.range(1, pagesCount + 1);

    if (pagesCount == 1) return null;
    return (
        <nav>
            <ul className="pagination">
                {currentPage != 1 ? (
                    <li className="page-item">
                        <a
                            onClick={function onPageLastClick() {
                                return handleFirst(currentPage);
                            }}
                            className="page-link"
                        >
                            {'First'}
                        </a>
                    </li>
                ) : null}

               {currentPage != 1 ?  <li className="page-item">
                    <a
                        onClick={function onPagePrevClick() {
                            return handlePrev(currentPage);
                        }}
                        className="page-link"
                    >
                        {'<<'}
                    </a>
                </li>
                : null}


                {pages.map(function renderPageCount(page, index) {
                    return (
                        <React.Fragment key={index}>
                            <li
                                className={
                                    page == currentPage
                                        ? 'page-item active'
                                        : 'page-item'
                                }
                            >
                                <a
                                    onClick={function onPageClick() {
                                        return handlePageChange(page);
                                    }}
                                    className="page-link"
                                >
                                    {page}
                                </a>
                            </li>
                        </React.Fragment>
                    );
                })}
                {pagesCount != currentPage ? <li className="page-item">
                    <a
                        onClick={function onPageNextClick() {
                            return handleNext(currentPage, pagesCount);
                        }}
                        className="page-link"
                    >
                        {'>>'}
                    </a>
                </li>
                :null}

                {pagesCount != currentPage ? (
                    <li className="page-item">
                        <a
                            onClick={function onPageLastClick() {
                                return handleLast(currentPage, pagesCount);
                            }}
                            className="page-link"
                        >
                            {'Last'}
                        </a>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
}

function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}
