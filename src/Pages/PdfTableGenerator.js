import React, { useEffect,useCallback,useState ,useContext} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { BranchContextExel } from './BranchContextExel';

const PdfTableGenerator = () => {
  const { service_id, branch_id, application_id } = useContext(BranchContextExel);
  console.log(branch_id)
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(null)
  const [data,setData]=useState([]);
  const printRef = React.useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true, // Enable CORS
    });
  
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('portrait', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
  
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    let imgHeight = (canvasHeight * pdfWidth) / canvasWidth;
    let heightLeft = imgHeight;
    let position = 0;
  
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;
  
    // Add remaining pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
  
    // Save the PDF
    pdf.save('table.pdf');
  };
  


  return (
    <>
      <div ref={printRef} style={{ padding: '20px', backgroundColor: '#fff', marginBottom: '20px', width: '100%',margin:'0 auto' }}>
       <img src="https://i0.wp.com/goldquestglobal.in/wp-content/uploads/2024/03/goldquestglobal.png?w=771&ssl=1" alt="" style={{ width:'200px'}} />
      
        <h1 style={{ textAlign: 'center', paddingBottom: '20px', fontWeight: '700', fontSize: '30px' }}>CONFIDENTIAL BACKGROUND VERIFICATION REPORT</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Name of the Candidate</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Jenny Alphonso Xavier</td>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Client Name</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Suryoday RBL School</td>
            </tr>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Application ID</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>GQ-SBL-37</td>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Report Status</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}> Date of Birth </td>
            </tr>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Application Received</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>21-09-2024</td>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Name</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap', border: '1px solid #ccc' }}>lorem ipsum dummy text ,lorem ipsum </td>
            </tr>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Verification Purpose</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Employment</td>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Application Recieved</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>28-09-2024</td>

            </tr>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Overall Report Status</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Green</td>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Final Report Date</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>John Doe</td>

            </tr>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Insuff Cleared/Reopened</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>N/A</td>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Name</th>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>John Doe</td>

            </tr>
          </thead>

        </table>
        <br />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{
                border: '1px solid #000',
                padding: '8px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                backgroundColor: '#22c55e',
                color: '#fff',
                borderBottom:'0px',
              }}
            >
              REPORT COMPONENTS
            </th>
            <th
              style={{
                border: '1px solid #000',
                padding: '8px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                backgroundColor: '#22c55e',
                color: '#fff',
                borderBottom:'0px',
              }}
            >
              INFORMATION SOURCE
            </th>
            <th
              colSpan={2}
              style={{
                border: '1px solid #000',
                borderBottom:'0px',
                padding: '8px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                backgroundColor: '#22c55e',
                color: '#fff',
              }}
            >
              COMPONENT STATUS
            </th>
          </tr>
          <tr>
            <th colSpan={2}   style={{
              padding: '8px',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              backgroundColor: '#22c55e',
              color: '#fff',
            }}></th>
            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              backgroundColor: '#22c55e',
              color: '#fff', }}>Completed Date</th>
            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              backgroundColor: '#22c55e',
              color: '#fff', }}>Verification Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>
              POLICE VERIFICATION
            </td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>
              Mr. Prashant Vishwas, Head Constable
            </td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>21-09-2024</td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Green</td>
          </tr>
        </tbody>
      </table>
      

        <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}> End of summary report</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ borderLeft: "1px solid #000", padding: '8px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%" }}>COMPONENT STATUS </th>
              <th style={{ borderLeft: "1px solid #000", padding: '8px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'green' }}></div>REPORT COMPONENTS</th>
              <th style={{ borderLeft: "1px solid #000", padding: '8px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'red' }}></div>INFORMATION SOURCE</th>
              <th style={{ borderLeft: "1px solid #000", padding: '8px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'orange' }}></div>COMPONENT STATUS  </th>
              <th style={{ borderLeft: "1px solid #000", padding: '8px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'pink' }}></div>COMPONENT STATUS  </th>
              <th style={{ borderLeft: "1px solid #000", padding: '8px', textAlign: 'center', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'stretch', width: "16.66%", gap: '15px' }}> <div style={{ height: '30px', width: '20px', backgroundColor: 'yellow' }}></div>COMPONENT STATUS  </th>
            </tr>
          </thead>
        </table>
        <h3 style={{ padding: '10px', border: '2px solid #000', backgroundColor: '#22c55e', width: '100%', color: '#fff', marginTop: '30px', textAlign: 'center' }}>POLICE VERIFICATION</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', borderTop: '0px' }}>
          <tbody>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Name of the Candidate</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Jenny Alphonso Xavier</td>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Client Name</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Suryoday RBL School</td>
            </tr>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Application ID</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>GQ-SBL-37</td>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Report Status</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}> Date of Birth </td>
            </tr>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Application Received</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>21-09-2024</td>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Name</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>John Doe</td>
            </tr>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Verification Purpose</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Employment</td>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Application Recieved</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>28-09-2024</td>

            </tr>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Overall Report Status</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Green</td>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Final Report Date</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>John Doe</td>

            </tr>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Insuff Cleared/Reopened</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>N/A</td>
              <th style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>Name</th>
              <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>John Doe</td>

            </tr>
          </tbody>

        </table>
        <p style={{ border: "2px solid #000", borderTop: '0px', padding: '10px' }}><b>Remarks</b>: The following applicant details are verbally verified by Mr. Prashant Vishwas, (Head Constable), and the notary
          report duly stamped and signed by Mr.Harsh Shukla (Advocate)with comment on criminal record not found, Hence
          closing the check as GREEN and the same is furnished as annexure.</p>
        <b> Annexure - 1 (A) </b>

        <div style={{ textAlign: 'center', }}>
          <h5 style={{ textTransform: 'uppercase' }}>Lorem, ipsum dolor.</h5>
          <h5 style={{ textTransform: 'uppercase' }}>Lorem ipsum dolor sit amet consectetur.</h5>
          <h5 style={{ textTransform: 'uppercase' }}>Lorem ipsum dolor sit.</h5>
          <hr />
        </div>
        <h5 style={{ textAlign: 'center', fontWeight: '700', marginTop: '30px', marginBottom: '10px', textDecoration: 'underline' }}>POLICE VERIFICATION REPORT</h5>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>APPLICATION ID</th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>
            </tr>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE APPLICANT</th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION</th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>

            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>   <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>
            <tr>
              <th style={{ border: "2px solid #000", padding: '8px', textAlign: 'left', borderRight: '1px solid #000', }}>NAME OF THE POLICE STATION OFFICER </th>
              <td style={{ padding: '8px', textAlign: 'left', border: '2px solid #000' }}>lorem ipsum dummy text ,lorem ipsum </td>

            </tr>

          </thead>
          <tbody>

          </tbody>
        </table>

        <h4 style={{ textTransform: 'uppercase', textAlign: 'left', fontSize: "24px", marginTop:'20px', fontWeight: 'bold', paddingBottom: '10px' }}>conclusion</h4>
        <p style={{ fontSize:'16px',fontWeight:'400', paddingBottom:'15px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere enim quidem dolorem alias animi sapiente at quisquam quam eveniet dolor, quo quos officiis, deserunt cupiditate minus necessitatibus, omnis blanditiis!</p>
        <h4 style={{ textTransform: 'uppercase', textAlign: 'left', fontSize: "24px", fontWeight: 'bold', paddingBottom: '10px' }}>conclusion</h4>
        <p style={{ fontSize:'16px',fontWeight:'400', paddingBottom:'15px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere enim quidem dolorem alias animi sapiente at quisquam quam eveniet dolor, quo quos officiis, deserunt cupiditate minus necessitatibus, omnis blanditiis!</p>
        <h4 style={{ textTransform: 'uppercase', textAlign: 'left', fontSize: "24px", fontWeight: 'bold', paddingBottom: '10px' }}>conclusion</h4>
        <p style={{ fontSize:'16px',fontWeight:'400', paddingBottom:'15px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere enim quidem dolorem alias animi sapiente at quisquam quam eveniet dolor, quo quos officiis, deserunt cupiditate minus necessitatibus, omnis blanditiis!</p>

        <div>
        <button style={{backgroundColor:'green',color:"#fff",padding:'13px',width:'100%',borderRadius:'10px', marginBottom:'15px'}}>Disclaimer</button>
        <p>This report is confidential and is meant for the exclusive use of the Client. This report has been prepared solely for the
        purpose set out pursuant to our letter of engagement (LoE)/Agreement signed with you and is not to be used for any
        other purpose. The Client recognizes that we are not the source of the data gathered and our reports are based on the
        information purpose. The Client recognizes that we are not the source of the data gathered and our reports are based on
        the information responsible for employment decisions based on the information provided in this report. </p>
        <button style={{border:'1px solid #000',padding:'13px',width:'100%',borderRadius:'10px',marginTop:'15px'}}>End of detail report</button>
        </div>
      </div>
      <button onClick={handleDownloadPdf}>Download PDF</button>
    </>
  );
};       


export default PdfTableGenerator;
