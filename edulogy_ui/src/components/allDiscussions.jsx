import React, { useState, useRef } from 'react';
import DiscussionCard from './card/discussionCard';
import DiscussionForm from './form/discussionForm';
import FloatingButton from './floatingButton';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BoxLoading } from 'react-loadingg';
import ReactPaginate from "react-paginate";

function AllDiscussions() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const discussionFormRef = useRef(null);
  const floatingButtonRef = useRef(null);

  const { data, isLoading, isError, refetch } = useQuery(['discussions', page], async () => {
    const response = await axios.get(`http://localhost:3000/api/problems?page=${page + 1}&pageSize=5`);
    setTotalPages(response.data.totalPage);
    console.log(response.data);
    return response.data;
  });

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  }

  const handleFloatingButtonClick = () => {
    if (discussionFormRef.current.classList.contains('active')) {
      floatingButtonRef.current.classList.remove('active');
      discussionFormRef.current.classList.remove('active');
    } else {
      floatingButtonRef.current.classList.add('active');
      discussionFormRef.current.classList.add('active');
    }
  }

  return (
    <div className="all-discussions">
      <div className="section-wrapper">
        <DiscussionForm refetch={refetch} ref={discussionFormRef} />

        <div className="all-discussions-area">
          {isLoading && <div id="loading-effect">
            <BoxLoading color='#00949e' />
          </div>}
          {isError && <div style={{ lineHeight: '80vh', textAlign: 'center' }}>Something went wrong</div>}
          {data && <div className="all-discussions-wrapper">
            <h2 className="title">Tất cả câu hỏi</h2>
            <div className="discussions-quantity">{data.totalProblem} câu hỏi</div>

            <div className="divider"></div>

            {data.doc.map(discussion => (
              <DiscussionCard key={discussion._id} discussion={discussion} />
            ))}

            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={totalPages}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              pageClassName={"paginated-btn"}
              breakClassName={"paginated-btn"}
              previousClassName={"prev-btn"}
              nextClassName={"next-btn"}
              disabledClassName={"disabled-btn"}
              activeClassName={"active-btn"}
              forcePage={page}
            />
          </div>}
        </div>
      </div>

      <FloatingButton onClick={handleFloatingButtonClick} ref={floatingButtonRef} />
    </div>
  )
}

export default AllDiscussions
