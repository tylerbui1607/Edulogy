import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";

import Nav from "../../common/nav";
import Footer from "../../common/footer";
import LoadingPage from "../loadingPage";
import Popup from "../../components/popup";
import MenuSidebar from "../../common/menuSidebar";
import Paginate from "../../common/paginate";
import TestCard from "../../components/card/testCard";
import { testActions } from "../../actions/testActions";
import { constants as c } from "../../constants";

function ListTestPage(props) {

  const dispatch = useDispatch();

  const [level, setLevel] = useState("full");
  const tests = useSelector(state => state.test.tests);
  let status = useSelector(state => state.test.status);
  let totalPage = useSelector(state => state.test.totalPage);

  let currentTest = useMemo(() => {
    if (!tests)
      return [];
    if (level === "full")
      return tests;
    let ctests = tests.filter((v) => v.level === level);
    return ctests;
  }, [level, tests]);

  const [query, setQuery] = useState({ ...queryString.parse(props.location.search), page: 1, pagesize: 10 });

  function handleChangeLevel(lv) {
    if (query.level === lv) {
      return;
    }
    setQuery({ ...query, level: lv, page: 1 });
    //let queryParams = { ...query, page: page };
    dispatch({ type: "CHANGE_TEST_PAGE" });
  }

  function handleChangePage(page) {
    if (query.page === page) {
      return;
    }
    setQuery({ ...query, page: page });
    //let queryParams = { ...query, page: page };
    dispatch({ type: "CHANGE_TEST_PAGE" });
    //dispatch(testActions.getTest(queryParams));
  }


  useEffect(() => {
    document.title = "Danh sách đề thi"
    if (status === c.LOADING)
      dispatch(testActions.getTest(query));
  }, [query])

  return (
    <React.Fragment>
      <Nav />
      <div className="list-test-page">
        {
          status === c.LOADING ? <LoadingPage />
            :
            <React.Fragment>
              <div>
                <div className="row">
                  <span>DANH SÁCH ĐỀ THI</span>
                  <div className="flex">
                    <button onClick={() => handleChangeLevel("")}>Toàn bộ</button>
                    <button onClick={() => handleChangeLevel("250-500")}>Level 250 - 500</button>
                    <button onClick={() => handleChangeLevel("500-750")}>Level 500 - 750</button>
                    <button onClick={() => handleChangeLevel("750-990")}>Level 750 - 990</button>
                  </div>
                </div>
                <div className="list-tests">
                  {
                    currentTest.map((v, i) => <TestCard key={i} img={v.img} id={v._id} name={v.name} time={v.time} level={v.level} />)
                  }
                </div>
              </div>
              <Paginate
                totalPage={totalPage}
                handleChangePage={handleChangePage}
                currentPage={query.page}
              />
            </React.Fragment>
        }
      </div>
      <Footer />
      <Popup />
      <MenuSidebar />
    </React.Fragment>
  )
}

export { ListTestPage }