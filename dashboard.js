/* =========================================================
   KJCF VISITOR DASHBOARD
   Temporary sample data
========================================================= */

const dashboardData = {

    totalVisitors: 1284,

    todayVisitors: 37,

    weekVisitors: 214,

    monthVisitors: 642,

    uniqueVisitors: 918,

    totalPageViews: 2461,


    /* VISITORS FOR EACH DAY */

    weeklyVisitors: [
        { day: "Mon", visitors: 18 },
        { day: "Tue", visitors: 31 },
        { day: "Wed", visitors: 27 },
        { day: "Thu", visitors: 42 },
        { day: "Fri", visitors: 35 },
        { day: "Sat", visitors: 24 },
        { day: "Sun", visitors: 37 }
    ],


    /* DEVICE BREAKDOWN */

    devices: {
        mobile: 71,
        desktop: 24,
        tablet: 5
    },


    /* COUNTRIES */

    countries: [
        { name: "India", visitors: 742 },
        { name: "United States", visitors: 186 },
        { name: "United Kingdom", visitors: 93 },
        { name: "Canada", visitors: 51 },
        { name: "Other", visitors: 212 }
    ],


    /* TRAFFIC SOURCES */

    sources: [
        { name: "Direct", visitors: 486 },
        { name: "Google", visitors: 391 },
        { name: "Instagram", visitors: 207 },
        { name: "Facebook", visitors: 112 },
        { name: "Other", visitors: 88 }
    ],


    /* RECENT VISITS */

    recentVisits: [
        {
            time: "17:42",
            page: "Devotionals",
            device: "Mobile",
            country: "India"
        },

        {
            time: "17:31",
            page: "Home",
            device: "Desktop",
            country: "India"
        },

        {
            time: "17:18",
            page: "About",
            device: "Mobile",
            country: "United States"
        },

        {
            time: "16:54",
            page: "Get Connected",
            device: "Mobile",
            country: "India"
        },

        {
            time: "16:41",
            page: "Devotionals",
            device: "Desktop",
            country: "United Kingdom"
        }
    ]
};


/* =========================================================
   STATISTICS
========================================================= */

document.getElementById("totalVisitors").textContent =
    dashboardData.totalVisitors.toLocaleString();

document.getElementById("todayVisitors").textContent =
    dashboardData.todayVisitors.toLocaleString();

document.getElementById("weekVisitors").textContent =
    dashboardData.weekVisitors.toLocaleString();

document.getElementById("monthVisitors").textContent =
    dashboardData.monthVisitors.toLocaleString();

document.getElementById("uniqueVisitors").textContent =
    dashboardData.uniqueVisitors.toLocaleString();

document.getElementById("totalPageViews").textContent =
    dashboardData.totalPageViews.toLocaleString();


/* =========================================================
   LAST UPDATED
========================================================= */

const now = new Date();

document.getElementById("lastUpdated").textContent =
    now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });


/* =========================================================
   WEEKLY VISITOR CHART
========================================================= */

const chart = document.getElementById("visitorChart");

const maxVisitors = Math.max(
    ...dashboardData.weeklyVisitors.map(item => item.visitors)
);


dashboardData.weeklyVisitors.forEach(item => {

    const column = document.createElement("div");

    column.className = "chart-column";


    const value = document.createElement("div");

    value.className = "chart-value";

    value.textContent = item.visitors;


    const bar = document.createElement("div");

    bar.className = "chart-bar";

    bar.style.height =
        `${(item.visitors / maxVisitors) * 85}%`;


    const day = document.createElement("div");

    day.className = "chart-day";

    day.textContent = item.day;


    column.appendChild(value);

    column.appendChild(bar);

    column.appendChild(day);

    chart.appendChild(column);

});


/* =========================================================
   DEVICE BREAKDOWN
========================================================= */

const devices = dashboardData.devices;


document.getElementById("mobilePercent").textContent =
    `${devices.mobile}%`;

document.getElementById("desktopPercent").textContent =
    `${devices.desktop}%`;

document.getElementById("tabletPercent").textContent =
    `${devices.tablet}%`;


document.getElementById("mobileBar").style.width =
    `${devices.mobile}%`;

document.getElementById("desktopBar").style.width =
    `${devices.desktop}%`;

document.getElementById("tabletBar").style.width =
    `${devices.tablet}%`;


/* =========================================================
   COUNTRIES
========================================================= */

const countriesList =
    document.getElementById("countriesList");


dashboardData.countries.forEach(country => {

    const row = document.createElement("div");

    row.className = "data-row";

    row.innerHTML = `
        <span>${country.name}</span>
        <strong>${country.visitors.toLocaleString()}</strong>
    `;

    countriesList.appendChild(row);

});


/* =========================================================
   TRAFFIC SOURCES
========================================================= */

const sourcesList =
    document.getElementById("sourcesList");


dashboardData.sources.forEach(source => {

    const box = document.createElement("div");

    box.className = "source-box";

    box.innerHTML = `
        <strong>${source.visitors.toLocaleString()}</strong>
        <span>${source.name}</span>
    `;

    sourcesList.appendChild(box);

});


/* =========================================================
   RECENT VISITS
========================================================= */

const recentVisits =
    document.getElementById("recentVisits");


dashboardData.recentVisits.forEach(visit => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${visit.time}</td>
        <td>${visit.page}</td>
        <td>${visit.device}</td>
        <td>${visit.country}</td>
    `;

    recentVisits.appendChild(row);

});


/* =========================================================
   LOGOUT
========================================================= */

document.getElementById("logoutBtn").addEventListener("click", () => {

    alert("Logout will be connected when the admin login system is added.");

});