import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [stockAmount, setStockAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [products, setProducts] = useState([]);
  const [school, setAllSchools] = useState([]);
  const [purchaseData, setAllPurchaseData] = useState([]);
  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quantidade de Estoque",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ],
      },
    },
    series: [
      {
        name: "Produtos",
        data: [],
      },
    ],
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalStockAmount();
    fetchTotalPurchaseAmount();
    fetchKitchensData();
    fetchProductsData();
    fetchMonthlyStockData();
    fetchSchoolData();
    fetchPurchaseData();
  }, []);

  const updateChartData = (purchaseData) => {
    const monthlyPurchase = new Array(12).fill(0);

    purchaseData.forEach(purchase => {
      const month = new Date(purchase.PurchaseDate).getMonth();
      monthlyPurchase[month] += purchase.QuantityPurchased;
    });

    setChart(prevChart => ({
      ...prevChart,
      series: [
        {
          ...prevChart.series[0],
          data: monthlyPurchase,
        },
      ],
    }));
  };

  const updateDoughnutChartData = (products) => {
    const categories = products.map(product => product.name);
    const stockAmounts = products.map(product => product.stock);

    setDoughnutData({
      labels: categories,
      datasets: [
        {
          label: "Quantidade de Estoque",
          data: stockAmounts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const fetchTotalStockAmount = () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/stock/get/${authContext.user}/totalstockamount`
    )
      .then((response) => response.json())
      .then((datas) => setStockAmount(datas.totalStockAmount));
  };

  const fetchTotalPurchaseAmount = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/purchase/get/${authContext.user}/totalpurchaseamount`)
      .then((response) => response.json())
      .then((data) => {
        setPurchaseAmount(data);
      })
      .catch((err) => console.error(err));
  };

  const fetchKitchensData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/kitchen/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setKitchens(datas))
      .catch((err) => console.log(err));
  };

  const fetchProductsData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => {
        setProducts(datas);
        updateDoughnutChartData(datas);
      })
      .catch((err) => console.log(err));
  };

  const fetchMonthlyStockData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stock/getmonthly`)
      .then((response) => response.json())
      .then((datas) => updateChartData(datas.stockAmount))
      .catch((err) => console.log(err));
  };

  const fetchSchoolData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/school/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllSchools(data);
      });
  };

  const fetchPurchaseData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/purchase/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
        updateChartData(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4">
        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Produtos
            </strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">
                {products.length}
              </span>
            </p>
          </div>
        </article>
        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Escolas
            </strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">
                {school.length}
              </span>
            </p>
          </div>
        </article>
        <div className="flex justify-around bg-white rounded-lg py-8 col-span-full justify-center">
          <div>
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="500"
            />
          </div>
          <div>
            <Doughnut data={doughnutData} />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
