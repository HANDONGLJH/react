import React, { useState } from "react";
import "./logsign.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 새 사용자 데이터 생성
    const newUser = {
      email,
      password,
    };

    // 기존 사용자 목록 가져오기
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 중복 이메일 확인
    const isExistingUser = existingUsers.some((user) => user.email === email);
    if (isExistingUser) {
      alert("이미 존재하는 이메일입니다.");
      return;
    }

    // 새로운 사용자 추가
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("회원가입 성공!");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>회원가입</h2>
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
