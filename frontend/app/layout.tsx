import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import CombinedProviders from "@/components/CombinedProviders";
import React from "react";
import StyledComponentsRegistry from "@/components/registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CombinedProviders>
        <StyledComponentsRegistry>
        <body>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "105vh" }}>
            <Navbar />
            <div style={{flexGrow: 1}}>{children}</div>
            <Footer />
          </div>
        </body>
        </StyledComponentsRegistry>
      </CombinedProviders>
    </html>
  );
}
