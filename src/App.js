import React from "react";
import github from "./db.js";
import { useEffect, useState, useCallback } from "react";
import query from "./Query.js";
import { RepoInfo } from "./RepoInfo";
import SearchBox from "./SearchBox.js";
import NavButtons from "./NavButtons.js";

function App() {
  let [userName, setUserName] = useState('');
  let [repoList, setRepoList] = useState('');
  let [pageCount, setPageCount] = useState('10');
  let [queryString, setQueryString] = useState('');
  let [totalCount, setTotalCount] = useState(null);


  let [startCursor, setStartCursor] = useState(null);
  let [endCursor, setEndCursor] = useState(null);
  let [hasPreviousPage, setHasPreviousPage] = useState(false);
  let [hasNextPage, setHasNextPage] = useState(true);
  let [paginationKeyword, setPaginationKeyword] = useState("first");
  let [paginationString, setPaginationString] = useState("");
  
  

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.header,
      body: queryText
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.edges;
        const total = data.data.search.repositoryCount;
        const start = data.data.search.pageInfo?.startCursor;
        const end = data.data.search.pageInfo?.endCursor;
        const next = data.data.search.pageInfo?.hasNextPage;
        const prev = data.data.search.pageInfo?.hasPreviousPage;





        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
        
        setStartCursor(start);
        setEndCursor(end);
        setHasPreviousPage(next);
        setHasNextPage(prev);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageCount, queryString, paginationKeyword, paginationString]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}!</p>
      <SearchBox 
      totalCount={totalCount}
      pageCount={pageCount}
      queryString={queryString}
      onTotalChange={(myString) => {setPageCount(myString)}}
      onQueryChange={(myString) => {setQueryString(myString)}}></SearchBox>
      <NavButtons start={startCursor} endCursor={endCursor} next={hasNextPage} previous={hasPreviousPage}
      onPage={(myKeyword, myString) =>
        {
          setPaginationKeyword(myKeyword);
          setPaginationString(myString);
        }
      }
      />
    

      {
        repoList && (
          <ul className="list-group list-group-flush">
            {
              repoList.map((repo) => (
                <RepoInfo key={repo.node.id} repo={repo.node} />
              ))
            }
          </ul>
        )
      }
    </div>
  );
}

export default App;
