const Dashboard = () => {
  return (
    <div className="layout">
      {/* MAIN AREA */}
      <div className="main">
        <div className="page-header">
          <h2>Dashboard</h2>
        </div>

        {/* CARDS */}
        <div className="cards">
          <div className="card">
            <div className="card-icon blue">👥</div>
            <div>
              <p className="card-title">Visitors</p>
              <h3>1,294</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-icon purple">🧍‍♂️</div>
            <div>
              <p className="card-title">Subscribers</p>
              <h3>1303</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-icon green">🛒</div>
            <div>
              <p className="card-title">Sales</p>
              <h3>$1,345</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-icon orange">✔</div>
            <div>
              <p className="card-title">Order</p>
              <h3>576</h3>
            </div>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="charts-row">
          <div className="chart-box">
            <div className="chart-header">
              <h3>User Statistics</h3>
              <button className="btn">Export</button>
            </div>
            <div className="fake-chart"></div>
            <div className="legend">
              <span className="red">● Subscribers</span>
              <span className="yellow">● New Visitors</span>
              <span className="blue">● Active Users</span>
            </div>
          </div>

          <div className="daily-sales">
            <h3>Daily Sales</h3>
            <p className="date">March 25 – April 02</p>
            <h1 className="amount">$4,578.58</h1>

            <div className="fake-chart small"></div>

            <p className="users-online">
              17 users online <span className="plus">+5%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
