export function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: '120px 160px' }}>
      <p className="tiny" style={{ marginBottom: 16 }}>
        Lost
      </p>
      <h1 className="display" style={{ maxWidth: '12ch' }}>
        This page is not on the survey.
      </h1>
      <p className="body" style={{ marginTop: 18 }}>
        The link may be old. Or the estate may have closed. Open land is on the explore page.
      </p>
      <a className="btn" href="/explore" style={{ marginTop: 28 }}>
        Explore land
      </a>
    </div>
  );
}
