let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520
  }
];

function formatCurrency(amount) {
  return amount.toLocaleString("vi-VN") + " VNĐ";
}

function normalizeTitleCase(str) {
  if (!str) {
    return "";
  }
  const words = str.trim().split(" ");
  const cleanWords = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i].trim();
    if (word !== "") {
      const capitalized = word[0].toUpperCase() + word.slice(1).toLowerCase();
      cleanWords.push(capitalized);
    }
  }
  return cleanWords.join(" ");
}

function findBookingIndex(code) {
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === code) {
      return i;
    }
  }
  return -1;
}

function validateBookingCode(code) {
  if (code === "") {
    return "Chưa nhập mã đặt vé";
  }
  if (code.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  if (!code.startsWith("CIN-")) {
    return 'Sai tiền tố "CIN-"';
  }
  if (code.includes(" ")) {
    return "Chứa khoảng trắng";
  }
  if (findBookingIndex(code) !== -1) {
    return "Mã đặt vé đã tồn tại";
  }
  return "";
}

function inputPositiveInteger(message) {
  while (true) {
    const input = prompt(message);
    if (input === null) {
      return null;
    }
    const trimmed = input.trim();
    const num = Number(trimmed);
    if (trimmed !== "" && !isNaN(num) && num > 0 && num % 1 === 0) {
      return num;
    }
    console.log("Giá trị phải là số nguyên lớn hơn 0, vui lòng nhập lại");
  }
}

function calculateTotal(ticketCount, pricePerTicket) {
  const baseCost = ticketCount * pricePerTicket;
  const discount = ticketCount >= 4 ? Math.round(baseCost * 0.1) : 0;
  const serviceFee = Math.round(0.08 * (baseCost - discount));
  const totalAmount = baseCost - discount + serviceFee;
  return {
    baseCost: baseCost,
    discount: discount,
    serviceFee: serviceFee,
    totalAmount: totalAmount
  };
}

function displayBookings(list) {
  if (list.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  let totalRevenue = 0;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    totalRevenue += item.totalAmount;
    console.log(`${i + 1}. ${item.bookingCode} - ${item.customerName} - ${item.movieTitle}`);
    console.log(`   SL: ${item.ticketCount} | Giá: ${formatCurrency(item.pricePerTicket)} | Tổng TT: ${formatCurrency(item.totalAmount)}`);
  }
  console.log(`Tổng: ${list.length} đơn đặt vé – Doanh thu: ${formatCurrency(totalRevenue)}`);
}

function handleDisplayBookings() {
  console.log("=== DANH SÁCH ĐƠN ĐẶT VÉ ===");
  displayBookings(bookings);
}

function handleAddBooking() {
  const codeInput = prompt("Nhập mã đặt vé (ví dụ: CIN-004):");
  if (codeInput === null) {
    console.log("Hủy thao tác thêm đơn đặt vé");
    return;
  }

  const code = codeInput.trim().toUpperCase();
  const errorCode = validateBookingCode(code);
  if (errorCode !== "") {
    console.log("Lỗi: " + errorCode);
    return;
  }

  let customerName = "";
  while (true) {
    const nameInput = prompt("Nhập tên khách hàng:");
    if (nameInput === null) {
      console.log("Hủy thao tác thêm đơn đặt vé");
      return;
    }
    if (nameInput.trim() !== "") {
      customerName = normalizeTitleCase(nameInput);
      break;
    }
    console.log("Tên khách hàng không được rỗng, vui lòng nhập lại");
  }

  let movieTitle = "";
  while (true) {
    const movieInput = prompt("Nhập tên phim:");
    if (movieInput === null) {
      console.log("Hủy thao tác thêm đơn đặt vé");
      return;
    }
    if (movieInput.trim() !== "") {
      movieTitle = normalizeTitleCase(movieInput);
      break;
    }
    console.log("Tên phim không được rỗng, vui lòng nhập lại");
  }

  const ticketCount = inputPositiveInteger("Nhập số lượng vé:");
  if (ticketCount === null) {
    console.log("Hủy thao tác thêm đơn đặt vé");
    return;
  }

  const pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé (VNĐ):");
  if (pricePerTicket === null) {
    console.log("Hủy thao tác thêm đơn đặt vé");
    return;
  }

  const totals = calculateTotal(ticketCount, pricePerTicket);
  const newBooking = {
    bookingCode: code,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: totals.totalAmount
  };

  bookings.push(newBooking);

  console.log("==================================================");
  console.log("                HÓA ĐƠN ĐẶT VÉ MỚI                ");
  console.log("==================================================");
  console.log(`Mã đặt vé      : ${newBooking.bookingCode}`);
  console.log(`Khách hàng     : ${newBooking.customerName}`);
  console.log(`Tên phim       : ${newBooking.movieTitle}`);
  console.log(`Số lượng vé    : ${newBooking.ticketCount}`);
  console.log(`Giá mỗi vé     : ${formatCurrency(newBooking.pricePerTicket)}`);
  console.log(`Chi phí cơ sở  : ${formatCurrency(totals.baseCost)}`);
  console.log(`Giảm giá       : ${formatCurrency(totals.discount)}`);
  console.log(`Phí dịch vụ    : ${formatCurrency(totals.serviceFee)}`);
  console.log(`Tổng thanh toán: ${formatCurrency(totals.totalAmount)}`);
  console.log("==================================================");
}

function handleUpdateBooking() {
  const codeInput = prompt("Nhập mã đặt vé cần cập nhật:");
  if (codeInput === null) {
    console.log("Hủy thao tác cập nhật đơn đặt vé");
    return;
  }

  const code = codeInput.trim().toUpperCase();
  const index = findBookingIndex(code);
  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${code}`);
    return;
  }

  const newTicketCount = inputPositiveInteger("Nhập số vé mới:");
  if (newTicketCount === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  const newPrice = inputPositiveInteger("Nhập giá mỗi vé mới (VNĐ):");
  if (newPrice === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  const oldTotal = bookings[index].totalAmount;
  const totals = calculateTotal(newTicketCount, newPrice);

  bookings[index].ticketCount = newTicketCount;
  bookings[index].pricePerTicket = newPrice;
  bookings[index].totalAmount = totals.totalAmount;

  console.log(`Cập nhật thành công đơn đặt vé ${code}`);
  console.log(`Tổng thanh toán cũ: ${formatCurrency(oldTotal)}`);
  console.log(`Tổng thanh toán mới: ${formatCurrency(totals.totalAmount)}`);
}

function handleDeleteBooking() {
  const codeInput = prompt("Nhập mã đặt vé cần xóa:");
  if (codeInput === null) {
    console.log("Hủy thao tác xóa đơn đặt vé");
    return;
  }

  const code = codeInput.trim().toUpperCase();
  const index = findBookingIndex(code);
  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${code}`);
    return;
  }

  const confirmInput = prompt(`Bạn có chắc chắn muốn xóa đơn đặt vé ${code} không? (Y/N):`);
  if (confirmInput !== null && confirmInput.trim().toUpperCase() === "Y") {
    bookings.splice(index, 1);
    console.log(`Xóa thành công, còn ${bookings.length} đơn`);
  } else {
    console.log(`Đã hủy thao tác xóa, còn ${bookings.length} đơn`);
  }
}

function handleSearchBookings() {
  const keyword = prompt("Nhập từ khóa tên phim cần tìm kiếm:");
  if (keyword === null || keyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  const cleanKeyword = keyword.trim().toLowerCase();
  const matchedBookings = [];
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].movieTitle.toLowerCase().includes(cleanKeyword)) {
      matchedBookings.push(bookings[i]);
    }
  }

  if (matchedBookings.length === 0) {
    console.log("Không tìm thấy đơn đặt vé phù hợp");
    return;
  }

  console.log(`Tìm thấy ${matchedBookings.length} đơn đặt vé phù hợp:`);
  displayBookings(matchedBookings);
}

function printSummaryReport() {
  console.log("==================================================");
  console.log("BÁO CÁO TỔNG KẾT ĐƠN ĐẶT VÉ");
  console.log("==================================================");
  if (bookings.length === 0) {
    console.log("Chưa có đơn đặt vé nào");
  } else {
    let totalRevenue = 0;
    let maxBooking = bookings[0];

    for (let i = 0; i < bookings.length; i++) {
      totalRevenue += bookings[i].totalAmount;
      if (bookings[i].totalAmount > maxBooking.totalAmount) {
        maxBooking = bookings[i];
      }
    }

    const averageRevenue = Math.round(totalRevenue / bookings.length);

    console.log(`Tổng số đơn đặt vé: ${bookings.length}`);
    console.log(`Tổng doanh thu: ${formatCurrency(totalRevenue)}`);
    console.log(`Doanh thu trung bình: ${formatCurrency(averageRevenue)}`);
    console.log(`Đơn cao nhất: ${maxBooking.bookingCode} - ${formatCurrency(maxBooking.totalAmount)}`);
  }
  console.log("==================================================");
  console.log("Cảm ơn bạn đã sử dụng hệ thống. Tạm biệt.");
}

let choice = -1;
do {
  console.log("=====================================================");
  console.log("     HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA        ");
  console.log("=====================================================");
  console.log("1. Hiển thị danh sách đơn đặt vé");
  console.log("2. Thêm đơn đặt vé mới");
  console.log("3. Cập nhật đơn đặt vé");
  console.log("4. Xóa đơn đặt vé");
  console.log("5. Tìm kiếm đơn đặt vé theo tên phim");
  console.log("0. Thoát chương trình");
  console.log("=====================================================");

  const choiceInput = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");
  if (choiceInput === null) {
    console.log("Lựa chọn không hợp lệ, vui lòng nhập số từ 0 đến 5");
    continue;
  }

  const choiceString = choiceInput.trim();
  choice = Number(choiceString);
  if (choiceString === "" || isNaN(choice) || choice < 0 || choice > 5 || choice % 1 !== 0) {
    console.log("Lựa chọn không hợp lệ, vui lòng nhập số từ 0 đến 5");
    continue;
  }

  switch (choice) {
    case 1: {
      handleDisplayBookings();
      break;
    }
    case 2: {
      handleAddBooking();
      break;
    }
    case 3: {
      handleUpdateBooking();
      break;
    }
    case 4: {
      handleDeleteBooking();
      break;
    }
    case 5: {
      handleSearchBookings();
      break;
    }
    case 0: {
      printSummaryReport();
      break;
    }
    default: {
      console.log("Lựa chọn không hợp lệ, vui lòng nhập số từ 0 đến 5");
      break;
    }
  }
} while (choice !== 0);
