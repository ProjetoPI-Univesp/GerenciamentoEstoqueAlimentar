import React, { useState, useEffect, useContext } from "react";
import AddExit from "../components/AddExit";
import AuthContext from "../AuthContext";

function Exits() {
  const [showExitModal, setShowExitModal] = useState(false);
  const [exits, setAllExitsData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [schools, setAllSchools] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchExitsData();
    fetchProductsData();
    fetchSchoolsData();
  }, [updatePage]);

  // Fetching Data of All Exits
  const fetchExitsData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/exits/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllExitsData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Schools
  const fetchSchoolsData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/school/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllSchools(data);
      });
  };

  // Modal for Exit Add
  const addExitModalSetting = () => {
    setShowExitModal(!showExitModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showExitModal && (
          <AddExit
            addExitModalSetting={addExitModalSetting}
            products={products}
            schools={schools}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Saídas</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addExitModalSetting}
              >
                Adicionar Saída
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Produto
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Escola
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantidade
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Data
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {exits.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.productID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.schoolID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stockSold}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.exitDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Exits;
