const form = document.getElementById("issuanceForm");
const certSection = document.getElementById("certificateSection");
const formSection = document.getElementById("formSection");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const type = document.getElementById("certificateType").value;
  const name = document.getElementById("fullName").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const civilStatus = document.getElementById("civilStatus").value;
  const address = document.getElementById("address").value;
  const purpose = document.getElementById("purpose").value;
  const dateToday = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

  const title = document.getElementById("certificateTitle");
  const content = document.getElementById("certificateContent");

  title.textContent = type.toUpperCase();

  let body = `
    <p>TO WHOM IT MAY CONCERN:</p>
    <p>This is to certify that:</p>
    <p><strong>${name.toUpperCase()}</strong><br>
    ${age} YEARS OLD, ${gender.toUpperCase()}, ${civilStatus.toUpperCase()}<br>
    Resident of ${address}</p>
  `;

  if (type === "Barangay Clearance") {
    body += `
      <p>is known to be of good moral character and a law-abiding citizen of this community.</p>
      <p>That according to our records, the above-named person has not been charged or convicted of any crime or violation of any law or ordinance.</p>
    `;
  } else if (type === "Certificate of Indigency") {
    body += `
      <p>is a bonafide resident of Barangay Poblacion and is considered as indigent based on the standard set by this Barangay.</p>
    `;
  } else if (type === "Certificate of Residency") {
    body += `
      <p>is a bonafide resident of Barangay Poblacion, Cauayan, Negros Occidental and has been residing at the given address for a period of time.</p>
    `;
  } else if (type === "Certificate of Good Moral") {
    body += `
      <p>is of good moral character and has not been involved in any criminal or immoral acts based on the Barangay's records.</p>
    `;
  }

  body += `
    <p>This certification is issued upon request of the above-named person for the purpose of <strong>${purpose}</strong>.</p>
    <p>Issued this <strong>${dateToday}</strong> at Barangay Poblacion, Cauayan, Negros Occidental.</p>
  `;

  content.innerHTML = body;

  formSection.style.display = "none";
  certSection.style.display = "block";

  // Auto Print
  setTimeout(() => {
    window.print();
  }, 500);
});
