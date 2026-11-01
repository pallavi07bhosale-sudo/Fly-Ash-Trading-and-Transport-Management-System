function generateReport() {

    const reportType =
        document.getElementById("reportType").value;

    const fromDate =
        document.getElementById("fromDate").value;

    const toDate =
        document.getElementById("toDate").value;


    // DATE VALIDATION

    if (fromDate === "" || toDate === "") {

        alert("Please select From Date and To Date.");

        return;
    }


    if (fromDate > toDate) {

        alert("From Date cannot be greater than To Date.");

        return;
    }


    // SHOW REPORT

    document.getElementById("reportResult").style.display = "block";


    // GET REPORT TYPE NAME

    const reportTypeElement =
        document.getElementById("reportType");

    const typeText =
        reportTypeElement.options[
            reportTypeElement.selectedIndex
        ].text;


    // DISPLAY REPORT INFORMATION

    document.getElementById("showReportType").innerText =
        typeText;

    document.getElementById("showFromDate").innerText =
        fromDate;

    document.getElementById("showToDate").innerText =
        toDate;


    // SUCCESS MESSAGE

    alert("Report generated successfully!");


    // SCROLL TO REPORT

    document.getElementById("reportResult")
        .scrollIntoView({
            behavior: "smooth"
        });

}