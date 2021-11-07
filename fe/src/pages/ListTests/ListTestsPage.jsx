import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { constants as c } from "../../constants";
import { testActions } from "../../actions/testActions";
import queryString from "query-string";
import Loading from "../../components/Common/Loading";
import TestCard from "../../components/Cards/TestCard";
import Paginate from "../../components/Common/Paginate";
function ListTestsPage(props) {
  const dispatch = useDispatch();
  const [level, setLevel] = useState("");
  const tests = useSelector(state => state.test.tests);
  let status = useSelector(state => state.test.status);
  let totalPage = useSelector(state => state.test.totalPage);
  let currentTest = useMemo(() => {
    if (!tests)
      return [];
    if (level === "")
      return tests;
    let ctests = tests.filter((v) => v.level === level);
    return ctests;
  }, [level, tests]);
  const [query, setQuery] = useState({ ...queryString.parse(props.location.search), page: 1, pagesize: 10 });
  function handleChangeLevel(lv) {
    if (query.level === lv) {
      return;
    }
    setLevel(lv);
    setQuery({ ...query, level: lv, page: 1 });
    dispatch({ type: "CHANGE_TEST_PAGE" });
  }
  function handleChangePage(page) {
    if (query.page === page) {
      return;
    }
    setQuery({ ...query, page: page });
    dispatch({ type: "CHANGE_TEST_PAGE" });
  }
  useEffect(() => {
    document.title = "Danh sách đề thi";
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    if (status === c.LOADING)
      dispatch(testActions.getTest(query));
  }, [query])
  return (
    <React.Fragment>
      <div className="list-test-page container">
        {
          status === c.LOADING ? <Loading />
            :
            <React.Fragment>
              <div>
                <div className="row">
                  <span>DANH SÁCH ĐỀ THI</span>
                  <div className="flex">
                    <button
                      className={level === "" ? "active" : ""}
                      onClick={() => handleChangeLevel("")}>
                      Toàn bộ
                    </button>
                    <button
                      className={level === "250-500" ? "active" : ""}
                      onClick={() => handleChangeLevel("250-500")}>
                      Level 250 - 500
                    </button>
                    <button
                      className={level === "500-750" ? "active" : ""}
                      onClick={() => handleChangeLevel("500-750")}>
                      Level 500 - 750
                    </button>
                    <button
                      className={level === "750-990" ? "active" : ""}
                      onClick={() => handleChangeLevel("750-990")}>
                      Level 750 - 990
                    </button>
                  </div>
                </div>
                <div className="list-tests">
                  {
                    currentTest.map((v, i) =>
                      <TestCard
                        key={i}
                        id={v._id}
                        {...v}
                      />)
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
    </React.Fragment>
  )
}

export { ListTestsPage }