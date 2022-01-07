let studentList = [];
//Chức năng 1: Lấy danh sách từ backend => suw3r dụng thư viện axios
const fetchStudents = () => {
  axios({
    url:"http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
    method:"GET",
  })
  .then((response) => {
    studentList = response.data;
    console.log(studentList);
    renderStudent();
  })
  .catch((err)=>{
    console.log(err);
  });
}
fetchStudents();
//Chức năng 2: Render dữ liệu sinh viên lên màn hình
// <tr>
  //   <td>123</td>
  //   <td>Đặng Trung Hiếu</td>
  //   <td>dangtrunghieu147@gmail.com</td>
  //   <td>0334643124</td>
  //   <td>1</td>
  //   <td>2</td>
  //   <td>3</td>
  //   <td></td>
  // </tr>;
const renderStudent = () => {
  const dataTable = document.getElementById("tableDanhSach");
  let content = "";
  studentList.map((student) => {
    content += `
    <tr>
      <td>${student.MaSV}</td>
      <td>${student.HoTen}</td>
      <td>${student.Email}</td>
      <td>${student.SoDT}</td>
      <td>${student.DiemToan}</td>
      <td>${student.DiemLy}</td>
      <td>${student.DiemHoa}</td>
      <td >
        <button class="btn btn-danger"onclick="deleteStudent('${student.MaSV}')">Xóa</button>
        <button class="btn btn-info" onclick="getStudent('${student.MaSV}')">Cập nhật</button>
      </td>
    </tr>
    `
    return content;
  })
  
  dataTable.innerHTML = content;
}
//CHức năng 3: Thêm sinh viên
const addStudent = () => {
    const studentId = document.getElementById("id").value;
    const studentName = document.getElementById("name").value;
    const studentEmail = document.getElementById("email").value;
    const studentPhone = document.getElementById("phone").value;
    const studentCard = document.getElementById("idCard").value;
    const studentMath = document.getElementById("math").value;
    const studentPhysics = document.getElementById("physics").value;
    const studentChemistry = document.getElementById("chemistry").value;

    let studentNew = new Student(studentId,studentName,studentEmail,studentPhone,studentCard,studentMath,studentPhysics,studentChemistry);
    
    //gửi data về cho backend => thêm vào

    axios({
      url:"http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
      method:"POST",
      data:studentNew,
    })
    .then((res)=>{
      fetchStudents();
    })
    .catch((err)=>{
      console.log(err);
    });
   
}
// Chức năng 4: Xóa sinh viên
const deleteStudent = (id) => {
    axios({
      url:`http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
      method:"DELETE",
    })
    .then((res) => {
      fetchStudents();
    })
    .catch((err)=>{
      console.log(err);
    })
}
//Chức năng 5: lấy thông tin sinh viên ,và hiển thị lên cái form
const getStudent = (id) => {
  let student = {};
  axios({
    url:`http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
    method: 'GET'
  })
  .then((res)=>{
    student = res.data;
      document.getElementById("btnThem").click();

      document.getElementById("id").value = student.MaSV;
      document.getElementById("name").value = student.HoTen;
      document.getElementById("email").value = student.Email;
      document.getElementById("phone").value = student.SoDT;
      document.getElementById("idCard").value = student.CMND;
      document.getElementById("math").value = student.DiemToan;
      document.getElementById("physics").value = student.DiemLy;
      document.getElementById("chemistry").value = student.DiemHoa;   

      document.getElementById("id").setAttribute("disabled",true);

  }).catch((err)=>{
    console.log(err);
  });
}
//chức năng 6: cập nhật thông tin sinh viên
const updateStudent = ()=>{
  const studentId = document.getElementById("id").value;
  const studentName = document.getElementById("name").value;
  const studentEmail = document.getElementById("email").value;
  const studentPhone = document.getElementById("phone").value;
  const studentCard = document.getElementById("idCard").value;
  const studentMath = document.getElementById("math").value;
  const studentPhysics = document.getElementById("physics").value;
  const studentChemistry = document.getElementById("chemistry").value;

  let studentNew = new Student(studentId,studentName,studentEmail,studentPhone,studentCard,studentMath,studentPhysics,studentChemistry);
  
  //gửi data về cho backend => thêm vào

  axios({
    url:"http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
    method:"PUT",
    data:studentNew,
  })
  .then((res)=>{
    fetchStudents();
    //clear form data
    document.getElementById("btnReset").click();
    //đóng modal
    document.getElementById("btnClose").click();
    // 
    document.getElementById("id").removeAttribute("disabled");

  })
  .catch((err)=>{
    console.log(err);
  });
}

