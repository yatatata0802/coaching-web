import React from "react";
import styled from "styled-components";
import { colors } from "../styles/GlobalStyles";

const ServicePage: React.FC = () => (
  <>
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#181818",
        color: "#fff",
        fontFamily: "Noto Sans JP, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.2em", color: "#D4AF37", marginBottom: "1em" }}>
        SERVICE
      </h1>
      <p
        style={{
          fontSize: "1.2em",
          maxWidth: 600,
          textAlign: "center",
          lineHeight: 1.8,
        }}
      >
        This is the Service page. You can describe your coaching services,
        features, and value here.
        <br />
        (ここにサービス内容や特徴、価値を英語・日本語で記載できます)
      </p>
    </div>
  </>
);

export default ServicePage;
