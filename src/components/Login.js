import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import "./logsign.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate 초기화

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지
    console.log("폼 제출 이벤트 발생"); // 디버깅 확인

    onLogin({ email, password });

    // 로그인 성공 후 메인 페이지로 이동
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
