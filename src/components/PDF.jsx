import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  section: {
    margin: 10,
    padding: 5,
  },
  companyInfo: {
    flexDirection: "row",
    textAlign: "right",
    marginBottom: 20,
  },
  companyInfo2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  companyName: {
    fontSize: 12,
    textAlign: "right",
    fontWeight: "bold",
  },
  userData: {
    marginLeft: 30,
    padding: 5,
    width: "55%",
  },
  dataSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  extraDataSection: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  data: {
    fontSize: 14,
    marginLeft: 10,
  },
  text: {
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "auto",
    border: "2pt solid #000",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1pt solid #000",
  },
  cell: {
    flex: 1,
    padding: 10,
  },
});

const EmployeePDF = ({ employeeData }) => {
  const imageUrl = "../../public/logo.png";

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch(imageUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const bytes = new Uint8Array(arrayBuffer);
        const base64Image = btoa(String.fromCharCode(...bytes));
        setImageData(base64Image);
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
  }, []);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Section: Company Information */}
        <View style={styles.section}>
          <View style={styles.companyInfo}>
            {/* Logo */}
            {imageData && (
              <Image src="../../public/logo.png" style={styles.logo} />
            )}

            {/* Company Name */}
            <View style={styles.companyInfo2}>
              <Text style={styles.companyName}>
                CHITTARANJAN NATIONAL CANCER INSTITUTE
              </Text>
              <Text style={styles.companyName}>
                An Autonomous Body under Ministry of Health & Family Welfare
                Govt. of India
              </Text>
              <Text style={styles.companyName}>
                Newtown, Action Area 1, Kolkata 700156
              </Text>
              <Text style={styles.companyName}>
                Email: cncinstkol@gmail.com, Website: www.cnci.org.in
              </Text>
            </View>
          </View>
        </View>

        {/* ... (rest of your code) */}
        <View style={styles.userData}>
          <View style={styles.dataSection}>
            <Text style={styles.heading}>Name:</Text>
            <Text style={styles.data}>{employeeData.name}</Text>
          </View>

          <View style={styles.dataSection}>
            <Text style={styles.heading}>Designation:</Text>
            <Text style={styles.data}>{employeeData.designation}</Text>
          </View>

          <View style={styles.dataSection}>
            <Text style={styles.heading}>Phone Number:</Text>
            <Text style={styles.data}>{employeeData.phone}</Text>
          </View>

          <View style={styles.dataSection}>
            <Text style={styles.heading}>BioID:</Text>
            <Text style={styles.data}>{employeeData.bioID}</Text>
          </View>

          <View style={styles.dataSection}>
            <Text style={styles.heading}>Residing Building:</Text>
            <Text style={styles.data}>{employeeData.residingBuilding}</Text>
          </View>

          <View style={styles.dataSection}>
            <Text style={styles.heading}>Room Number:</Text>
            <Text style={styles.data}>{employeeData.room}</Text>
          </View>

          <View style={styles.dataSection}>
            <Text style={styles.heading}>Paying for the month of:</Text>
            <Text style={styles.data}>{employeeData.month}</Text>
          </View>

          <View style={styles.dataSection}>
            <Text style={styles.heading}>Employee Type:</Text>
            <Text style={styles.data}>{employeeData.selection}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text>Fees Breakdown:</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text>Fee Type</Text>
              </View>
              <View style={styles.cell}>
                <Text>Amount</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text>Electricity Fees</Text>
              </View>
              <View style={styles.cell}>
                <Text>{employeeData.electricityFees}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text>Lab Fees</Text>
              </View>
              <View style={styles.cell}>
                <Text>{employeeData.labFees}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text>Other Fees</Text>
              </View>
              <View style={styles.cell}>
                <Text>{employeeData.otherFees}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text>Date: {formattedDate}</Text>
        </View>
      </Page>
    </Document>
  );
};

const App = () => (
  <PDFViewer width={600} height={800}>
    <EmployeePDF
      employeeData={{
        name: "John Doe",
        designation: "Manager",
        phone: "555-555-5555",
        residingBuilding: "Building A",
        bioID: "f3v4e5f1e3g1er32g1et",
        room: "12",
        month: "October",
        selection: "Contractual",
        electricityFees: "$100",
        labFees: "$50",
        otherFees: "$25",
      }}
    />
  </PDFViewer>
);

export default App;
