var UserIdAutoIncrement = 1000;
var MedicineIdAutoIncrement = 10;
var OrderIdAutoIncrement = 100;
var CurrentUserId;
var CurrentMedicineId;
var CurrentloggedInUser;
var User = /** @class */ (function () {
    function User(paramUserEmail, paramUserPassword, paramUserPhone) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserEmail = paramUserEmail;
        this.UserPassword = paramUserPassword;
        this.UserPhone = paramUserPhone;
        this.WalletBalance = 0;
    }
    User.prototype.rechargeWallet = function (paramAmount) {
        this.WalletBalance += paramAmount;
    };
    User.prototype.showBalance = function () {
        return this.WalletBalance;
    };
    return User;
}());
var MedicineInfo = /** @class */ (function () {
    function MedicineInfo(paramMedicineName, paramMedicineCount, paramMedicinePrice, paramMedicineExpiryDate) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = paramMedicineExpiryDate;
    }
    return MedicineInfo;
}());
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Ordered"] = 0] = "Ordered";
    OrderStatus[OrderStatus["Cancelled"] = 1] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
var Order = /** @class */ (function () {
    function Order(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount, paramTotalPrice, paramOrderStatus) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.TotalPrice = paramTotalPrice;
        this.OrderStatus = paramOrderStatus;
    }
    return Order;
}());
var UserArrayList = new Array();
UserArrayList.push(new User("Prakash@gmail.com", "password", 9361415123));
var MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracitamol", 40, 5, new Date("2024-06-30")));
MedicineList.push(new MedicineInfo("Calpol", 10, 5, new Date("2024-05-30")));
MedicineList.push(new MedicineInfo("Gelusil", 3, 40, new Date("2024-04-30")));
MedicineList.push(new MedicineInfo("Metrogel", 5, 50, new Date("2024-12-30")));
MedicineList.push(new MedicineInfo("Povidin Iodin", 10, 50, new Date("2024-10-30")));
var OrderList = new Array();
OrderList.push(new Order("UI1001", "MD14", "Metrogel", 3, 150, OrderStatus.Ordered));
function homePage() {
    var homePage = document.getElementById("homePage");
    homePage.style.display = "block";
}
function newUser() {
    var home = document.getElementById("homePage");
    var newUser = document.getElementById("newUserPage");
    home.style.display = "none";
    newUser.style.display = "block";
}
function SignUp() {
    var newUserEmail = document.getElementById("userEmail").value;
    var newUserPassword = document.getElementById("CFPassword").value;
    var newUserPhone = document.getElementById("userPhone").value;
    var newUser1 = new User(newUserEmail, newUserPassword, +newUserPhone);
    UserArrayList.push(newUser1);
    alert("User ID is " + newUser1.UserId);
    // existingUser();
    // linkIn();
}
function existingUser() {
    var home = document.getElementById("homePage");
    var existingUser = document.getElementById("existingUserPage");
    home.style.display = "none";
    existingUser.style.display = "block";
}
function linkIn() {
    var newUser = document.getElementById("newUserPage");
    var existingUser = document.getElementById("existingUserPage");
    newUser.style.display = "none";
    existingUser.style.display = "block";
}
function SignIn() {
    var noExistingUserIdChecker = true;
    var existingUserId = document.getElementById("existingUserId").value;
    var existingUserIDRegex = /^UI\d{4}$/;
    if (existingUserIDRegex.test(existingUserId)) {
        for (var i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].UserId == existingUserId) {
                noExistingUserIdChecker = false;
                CurrentUserId = existingUserId;
                CurrentloggedInUser = UserArrayList[i];
                alert("logged-in");
                medicinePage();
                return;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Invalid UserID");
        }
    }
    else {
        alert("Invalid User ID");
    }
}
function medicinePage() {
    var homePage = document.getElementById("homePage");
    var existingUserPage = document.getElementById('existingUserPage');
    var medicinePage = document.getElementById('medicinePage');
    var greet = document.getElementById('greet');
    homePage.style.display = "none";
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    // greet.innerHTML = `<h3>Hello ${CurrentUserName}</h3>`;
}
function showMedicine() {
    var medicineInfoPage = document.getElementById("medicine-info");
    medicineInfoPage.style.display = "block";
    var table = document.getElementById("dataTable");
    var medicineBtn = document.getElementById("medicine-btn");
    var heading = document.createElement("tr");
    heading.innerHTML = "<th>".concat("MedicineID", "</th><th>").concat("Medicine Name", "</th><th>").concat("Medicine Count", "</th><th>").concat("Medicine Price", "</th><th>").concat("Expiry Date", "</th>");
    table.appendChild(heading);
    for (var i = 0; i < MedicineList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(MedicineList[i].MedicineId, "</td>\n        <td>").concat(MedicineList[i].MedicineName, "</td>\n        <td>").concat(MedicineList[i].MedicineCount, "</td>\n        <td>").concat(MedicineList[i].MedicinePrice, "</td>\n        <td>").concat(MedicineList[i].MedicineExpiryDate.toString(), "</td>");
        table.appendChild(row);
    }
    medicineBtn.disabled = true;
}
function Purchase() {
    var medicineInfoPage = document.getElementById("medicine-info");
    medicineInfoPage.style.display = "none";
    var purchasePage = document.getElementById("purchase-block");
    purchasePage.style.display = "block";
    var table = document.getElementById("purchase-table");
    var purchaseBtn = document.getElementById("purchase-btn");
    for (var i = 0; i < MedicineList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(MedicineList[i].MedicineId, "</td>\n        <td>").concat(MedicineList[i].MedicineName, "</td>\n        <td>").concat(MedicineList[i].MedicineCount, "</td>\n        <td>").concat(MedicineList[i].MedicinePrice, "</td>\n        <td>").concat(MedicineList[i].MedicineExpiryDate.toString(), "</td>\n        <td><button onclick=\"setGlobalMedicineId('").concat(MedicineList[i].MedicineId, "');\">buy</button></td>");
        table.appendChild(row);
    }
    purchaseBtn.disabled = true;
}
function setGlobalMedicineId(MedicineId) {
    CurrentMedicineId = MedicineId;
    var quantityBlock = document.getElementById("quantity-block");
    quantityBlock.style.display = "block";
}
function getQuantity() {
    var quantity = parseInt(document.getElementById("quantity").value);
    buyMedicine(quantity);
}
function buyMedicine(quantity) {
    for (var i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineId == CurrentMedicineId) {
            MedicineList[i].MedicineCount -= quantity;
            var totalPrice = quantity * MedicineList[i].MedicinePrice;
            var newOrder = new Order(MedicineList[i].MedicineId, CurrentUserId, MedicineList[i].MedicineName, quantity, totalPrice, OrderStatus.Ordered);
            OrderList.push(newOrder);
            alert("Ok");
        }
    }
}
function CancelOrder() {
    var cancelOrderTable = document.getElementById("cancel-order");
    var cancelOrderBtn = document.getElementById("cancel-order-btn");
    for (var i = 0; i < OrderList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(OrderList[i].OrderId, "</td>\n        <td>").concat(OrderList[i].UserId, "</td>\n        <td>").concat(OrderList[i].MedicineId, "</td>\n        <td>").concat(OrderList[i].MedicineName, "</td>\n        <td>").concat(OrderList[i].MedicineCount, "</td>\n        <td>").concat(OrderList[i].TotalPrice, "</td>\n        <td>").concat(OrderList[i].OrderStatus, "</td>\n        <td><button onclick=\"OrderCancel('").concat(OrderList[i].OrderId, "')\";>Cancel</button></td>");
        cancelOrderTable.appendChild(row);
    }
    cancelOrderBtn.disabled = true;
}
function OrderCancel(OrderId) {
    for (var i = 0; i <= OrderList.length; i++) {
        if (OrderList[i].OrderId == OrderId) {
            OrderList[i].OrderStatus = OrderStatus.Cancelled;
            alert("Order Cancelled Successfully");
            return;
        }
    }
}
function OrderHistory() {
    var orderHistoryTable = document.getElementById("order-history");
    var orderHistoryBtn = document.getElementById("order-history-btn");
    for (var i = 0; i < OrderList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(OrderList[i].OrderId, "</td>\n        <td>").concat(OrderList[i].UserId, "</td>\n        <td>").concat(OrderList[i].MedicineId, "</td>\n        <td>").concat(OrderList[i].MedicineName, "</td>\n        <td>").concat(OrderList[i].MedicineCount, "</td>\n        <td>").concat(OrderList[i].TotalPrice, "</td>\n        <td>").concat(OrderList[i].OrderStatus, "</td>");
        orderHistoryTable.appendChild(row);
    }
    orderHistoryBtn.disabled = true;
}
function getAmount() {
    var amount = parseInt(document.getElementById("top-up-amount").value);
    CurrentloggedInUser.rechargeWallet(amount);
}
