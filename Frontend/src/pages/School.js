import React, { useState, useEffect, useContext } from "react";
import AddSchool from "../components/AddSchools";
import AuthContext from "../AuthContext";

function School() {
  const [showModal, setShowModal] = useState(false);
  const [schools, setAllSchools] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all schools data
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/school/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllSchools(data);
      });
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center ">
      <div className=" flex flex-col gap-5 w-11/12 border-2">
        <div className="flex justify-between p-3">
          <span className="font-bold">Escolas</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
            onClick={modalSetting}
          >
            Adicionar Escola
          </button>
        </div>
        {showModal && <AddSchool />}
        {schools.map((element, index) => {
          return (
            <div
              className="bg-white w-50 h-fit flex flex-col gap-4 p-4 "
              key={element._id}
            >
              <div>
                <img
                  alt="school"
                  className="h-60 w-full object-cover"
                  src={element.image}
                />
              </div>
              <div className="flex flex-col gap-3 justify-between items-start">
                <span className="font-bold">{element.name}</span>
                <div className="flex">
                  <img
                    alt="location-icon"
                    className="h-6 w-6"
                    src={require("../assets/location-icon.png")}
                  />
                  <span>{element.address + ", " + element.city}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default School;
