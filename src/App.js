import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Filters from "./components/Filters";
import MemberTable from "./components/MemberTable";
import MemberDetail from "./components/MemberDetail";
import MyPage from "./components/MyPage";
import Chart from "./components/Chart";
import { regions } from "./data/regions";
import useMembers from "./hooks/useMembers";
import "./App.css";

const App = () => {
  const { members, filteredMembers, setFilteredMembers } = useMembers();
  const [filters, setFilters] = useState({
    name: "",
    party: "",
    committee: "",
    district: "",
    subDistrict: "",
    gender: "",
    ageRange: "",
    reelection: "",
    electionType: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const membersPerPage = 15;

  const handleLogin = (credentials) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find(
    (user) => user.email === credentials.email && user.password === credentials.password
  );

  console.log("handleLogin 호출됨", credentials); // 호출 확인

  if (user) {
    setIsAuthenticated(true);
    alert("로그인 성공!");
  } else {
    alert("로그인 실패! 이메일 또는 비밀번호를 확인해주세요.");
  }
};


  const applyFilters = () => {
    const filtered = members.filter((member) => {
      const birthYear = parseInt(member.BTH_DATE?.split("-")[0] || "0");
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      return (
        (!filters.name || member.HG_NM?.includes(filters.name)) &&
        (!filters.party || member.POLY_NM === filters.party) &&
        (!filters.committee || member.CMITS?.includes(filters.committee)) &&
        (!filters.district || member.ORIG_NM?.includes(filters.district)) &&
        (!filters.subDistrict ||
          filters.subDistrict === "전체" ||
          member.ORIG_NM?.includes(filters.subDistrict)) &&
        (!filters.gender || member.SEX_GBN_NM === filters.gender) &&
        (!filters.ageRange ||
          (filters.ageRange === "30-39" && age >= 30 && age < 40) ||
          (filters.ageRange === "40-49" && age >= 40 && age < 50) ||
          (filters.ageRange === "50-59" && age >= 50 && age < 60) ||
          (filters.ageRange === "60-69" && age >= 60 && age < 70) ||
          (filters.ageRange === "70+" && age >= 70)) &&
        (!filters.reelection || member.REELE_GBN_NM === filters.reelection) &&
        (!filters.electionType || member.ELECT_GBN_NM === filters.electionType)
      );
    });
    setFilteredMembers(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">            
      <img src="/congress.jpeg" alt="국회의사당" className="image-responsive" />              
              <Filters
                filters={filters}
                handleFilterChange={handleFilterChange}
                regions={regions}
                applyFilters={applyFilters}
              />
              <div className="results-container">
                <div className="results-text">
                  <h2>검색 결과</h2>
                  <p>
                    총 {members.length}명 중 {filteredMembers.length}명이 검색 조건에
                    부합합니다.
                  </p>
                </div>
                <div className="results-chart">
                  <Chart
                    filteredMembers={filteredMembers}
                    totalMembers={members.length}
                  />
                </div>
              </div>
              <MemberTable filteredMembers={currentMembers} />
              <div className="pagination-container">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className="pagination-button"
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/member/:id" element={<MemberDetail members={members} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
