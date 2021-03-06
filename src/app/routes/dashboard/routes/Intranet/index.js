import React, { useState, useEffect } from "react";
import MonthlyRevenue from "components/dashboard/Intranet/MonthlyRevenue";
import { connections, expanseData1 } from "../data";
import axios from "axios";
import { baseUrl } from "constants/serverDetails";

const Intranet = props => {
  const [menuState, setMenuState] = useState(false);
  const [user, setUser] = useState([]);
  const [vote, setVote] = useState([]);

  const fetchUsers = async () => {
    try {
      await axios({
        method: "get",
        url: `${baseUrl}api/users`,
        headers: { "Content-Type": "application/json" }
      }).then(users => {
        setUser(users.data);
        // console.log(users.data);
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      await axios({
        method: "get",
        url: `${baseUrl}api/votes`,
        headers: { "Content-Type": "application/json" }
      }).then(res => {
        setVote(res.data);
        // console.log(res.data);
        // console.log("This is vote response here", res);
        //  setIsLoading(false);
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  const handleRequestClose = () => {
    setMenuState(false);
  };

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      {/* <ContainerHeader
        match={props.match}
        title={<IntlMessages id="sidebar.dashboard.intranet" />}
      /> */}

      <div className="row">
        <div className="col-12">
          <div className="jr-card chart-user-statistics bg-primary darken-4 text-white">
            <div className="jr-dealclose-header px-4 mb-4">
              <div>
                <h4 className="mb-0">User Statstics</h4>
              </div>
              <div className="jr-dealclose-header-right">
                <p className="mb-2">
                  <span
                    style={{ backgroundColor: "#3BB4A3" }}
                    className="size-8 rounded-circle d-inline-block mr-1"
                  />
                  Votes
                </p>
                <p className="ml-2 mb-2">
                  <span
                    style={{ backgroundColor: "#FF9800" }}
                    className="size-8 rounded-circle d-inline-block mr-1"
                  />
                  Contestants
                </p>
              </div>
            </div>
            <MonthlyRevenue chartData={expanseData1} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="card jr-card-intra shadow text-center">
            <div className="card-header py-3 d-flex align-items-center">
              <h3 className="mb-0">
                {/* <IntlMessages id="sidebar.view" /> */}
                Users
              </h3>
              <span className="badge badge-secondary ml-auto">
                {/* <IntlMessages id="dashboard.monthly" /> */}
              </span>
            </div>
            <div className="stack-order py-4 px-2">
              <h1 className="chart-f30">{user.length}</h1>
              <span className="h3 text-muted">
                {/* <IntlMessages id="dashboard.totalView" /> */}
                Total users
              </span>
              <span className="h5 text-green">
                <i className="zmdi zmdi-flash zmdi-hc-fw" />
                9%
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="card jr-card-intra shadow text-center">
            <div className="card-header py-3 d-flex align-items-center">
              <h3 className="mb-0">
                {/* <IntlMessages id="dashboard.orders" /> */}
                Stage 1 contestants
              </h3>
              <span className="badge badge-secondary ml-auto">
                {/* <IntlMessages id="dashboard.annual" /> */}
              </span>
            </div>
            <div className="stack-order py-4 px-2">
              <h1 className="chart-f30">{vote.length}</h1>
              <span className="h3 text-muted">
                {/* <IntlMessages id="dashboard.newOrder" /> */}
              </span>
              <span className="h5 text-cyan">
                <i className="zmdi zmdi-long-arrow-return zmdi-hc-fw zmdi-hc-rotate-90" />
                1
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 col-12">
          <div className="card jr-card-intra shadow text-center">
            <div className="card-header py-3 d-flex align-items-center">
              <h3 className="mb-0">
                {/* <IntlMessages id="dashboard.visited" /> */}
                Total votes
              </h3>
              <span className="badge badge-primary ml-auto">
                {/* <IntlMessages id="dashboard.today" /> */}
              </span>
            </div>
            <div className="row no-gutters">
              <div className="col-6">
                <div className="stack-order py-4 px-2">
                  {/* <h1 className="chart-f30">406,42</h1> */}
                  <span className="h3">
                    {/* <IntlMessages id="dashboard.rapidPace" /> */}
                    {vote.length}
                  </span>
                  {/* <span className="h5 text-green">
                    <i className="zmdi zmdi-long-arrow-return zmdi-hc-fw zmdi-hc-rotate-90" />
                  </span> */}
                </div>
              </div>

              <div className="col-6">
                <div className="stack-order py-4 px-2">
                  {/* <h1 className="chart-f30">206,12</h1> */}
                  <span className="h3">
                    {/* <IntlMessages id="dashboard.slowPace" /> */}
                  </span>
                  {/* <span className="h5 text-red">
                    <i className="zmdi zmdi-long-arrow-return zmdi-hc-fw zmdi-hc-rotate-90" />
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row">
          <div className="col-lg-3 col-md-6 col-12">
            <UserProfileCard styleName="pb-4" headerStyle="bg-gradient-primary"/>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="jr-card jr-full-card">
              <CardHeader heading={<IntlMessages id="dashboard.newConnections"/>}
                          subHeading={<IntlMessages id="dashboard.thisWeek"/>}/>

              <UserDetailTable data={connections} tableStyle="full-table-last-sm"/>
            </div>
          </div>

          <div className="col-lg-5 col-12">
            <div className="jr-card">
              <CardHeader heading={<IntlMessages id="dashboard.recentActivities"/>}
                          subHeading={<IntlMessages id="dashboard.lastActivity"/>}/>

              {recentList.map((recentList, index) => <RecentActivities key={index}
                                                                       recentData={recentList}/>)}

            </div>
          </div>

          <div className="col-lg-6 col-12">
            <div className="jr-card">
              <div className="jr-card-header d-flex align-items-center justify-content-between">
                <h3 className="mb-0"><IntlMessages id="dashboard.currentProjects"/></h3>
                <span className="badge badge-secondary"><IntlMessages id="table.thisWeek"/></span>
              </div>
              <ProjectsList data={projects}/>
            </div>
          </div>

          <div className="col-lg-6 col-12">
            <div className="jr-card jr-full-card">
              <div className="jr-card-header d-flex align-items-center">
                <div className="mr-auto">
                  <h3 className="card-heading d-inline-block mb-0"><IntlMessages
                    id="dashboard.yourDailyFeed"/></h3>
                </div>

                <span className="badge badge-secondary"><IntlMessages id="dashboard.newFeed"/></span>
              </div>
              <YourDailyFeed data={dailyFeedData}/>
              <div className="daily-feed-footer">
                <span className="jr-link card-link"><IntlMessages id="dashboard.viewAll"/></span>
              </div>
            </div>
          </div>
        </div> */}

      {/* <div className="row">
          <div className="col-lg-4 col-md-6 col-12 order-lg-1">
            <div className="jr-card pb-4">
              <div className="jr-card-header d-flex align-items-center">
                <div className="mr-auto">
                  <h3 className="card-heading d-inline-block mb-0"><IntlMessages
                    id="dashboard.toDoItems"/></h3>
                </div>
                <span className="badge badge-secondary"><IntlMessages id="dashboard.today"/></span>
              </div>
              <div className='pt-2'>
                <SimpleToDo data={todoData}/>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 order-lg-3">
            <div className="jr-card pb-3">
              <div className='mt-n2'>
                <CardHeader styleName="mb-3 align-items-center" heading={<IntlMessages id="dashboard.weekly"/>}/>
              </div>
              <WeeklyList data={weeklyData}/>
            </div>
          </div>

          <div className="col-lg-4 col-12 order-lg-2">
            <div className="jr-card jr-full-card">
              <div className="jr-card-header d-flex align-items-center">
                <h3 className="card-heading mb-0"><i
                  className="zmdi zmdi-chart-donut zmdi-hc-fw mr-2"/><IntlMessages
                  id="dashboard.marketingCampaign"/>
                </h3>
                <span className="badge badge-secondary ml-auto"><IntlMessages
                  id="dashboard.today"/></span>
              </div>
              <MarketingTable data={marketingData}/>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 order-lg-4">
            <LatestNotifications appNotification={appNotification}
                                 announcementsNotification={announcementsNotification}/>
          </div>

          <div className="col-lg-4 col-md-6 col-12 order-lg-6">
            <TimerView headerColor="gradient-primary"/>
          </div>

          <div className="col-lg-4 col-12 order-lg-5">
            <Statistics/>
          </div>

        </div> */}

      {/* <div className="row">
        <CardBox styleName="col-lg-8 col-12" heading="Site Visitors Statistics">
          <div>
            Lorem ipsum is dummy content Cenas in erat accumsan, hendrerit lorem
            vel, pulvinar odio. Quisque eu conva. hendrerit lorem vel, pulvinar
            odio. Quisque eu conva.
          </div>
          <SiteVisitor
            children={
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={chartData}>
                  <CartesianGrid
                    vertical
                    horizontal={false}
                    fillOpacity={0.2}
                    width={200}
                  />
                  <Area
                    type="linear"
                    dataKey="cv"
                    stroke="#3F51B5"
                    fillOpacity={0.8}
                    fill="#3F51B5"
                  />
                  <Area
                    type="linear"
                    dataKey="pv"
                    stroke="#FF9800"
                    fillOpacity={0.8}
                    fill="#FF9800"
                  />
                  <Area
                    type="linear"
                    dataKey="uv"
                    stroke="#4CAF50"
                    fillOpacity={0.8}
                    fill="#4CAF50"
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
        </CardBox>
        <div className="col-lg-4 col-12">
          <PhotoCollage />
        </div>

        <div className="col-lg-4 col-12">
          <ContactCard />
        </div>

        <div className="col-lg-8 col-12">
          <div className="jr-card p-2">
            <MapWithASearchBox styleName="embed-responsive-31by9" />
          </div>
        </div>

        <div className="col-12">
          <div className="jr-card mb-0">
            <CardHeader
              heading={<IntlMessages id="dashboard.popularProducts" />}
              subHeading={<IntlMessages id="dashboard.loremIpsum" />}
              styleName="mb-4"
            />

            <div className="row">
              {products.map((products, index) => (
                <PopularProduct
                  key={index}
                  product={products}
                  styleName="col-xl-4 col-md-6 col-12 mb-4"
                />
              ))}
            </div>
            <Button size="small" color="primary">
              VIEW ALL PRODUCTS
            </Button>
          </div>
        </div>
      </div> */}
      {/* <CardMenu
        menuState={menuState}
        anchorEl={undefined}
        handleRequestClose={handleRequestClose}
      /> */}
    </div>
  );
};

export default Intranet;
