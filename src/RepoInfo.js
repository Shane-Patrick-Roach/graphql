export const RepoInfo = ({ repo }) => {

  let license;

  switch (repo.licenseInfo?.spdxId) {
    case undefined:
      license = (
        <span className="px-1 py-0 ms-1 d-inline-block btn-sm btn-danger">

        </span>
      );
      break;

    case "NOASSERTION":
      license = (
        <span className="px-1 py-0 ms-1 d-inline-block btn-sm btn-danger">

        </span>
      );
      break;
      default:
        license = (
          <span className="px-1 py-0 ms-1 d-inline-block btn-sm btn-success">
  
          </span>
        );
        break;
  }


  return (


    <li className="list-group-item" key={repo.id.toString()}>

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <a className="h5 mb-0 text-decoration-none" href={repo.url}>{repo.name}
          </a>
          <p className="small">{repo.description}</p>

        </div>

        <div className="text-nowrap ms-3">
          {repo.licenseInfo?.spdxId}



          <span className={
            "px-1 py-1 ms-1 d-inline-block btn btn-sm" +
            (
              repo.viewerSubscription === "SUBSCRIBED" ? "btn-green" : "btn-outline-secondary"
            )
          }>
            {repo.viewerSubscription}</span>
        </div>
      </div>

    </li>
  )

}



