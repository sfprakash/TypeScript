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
OrderList.push(new Order("MD14", "UI1001", "Metrogel", 3, 150, OrderStatus.Ordered));
//to display pages
// let HomePage = document.getElementById("home-page") as HTMLDivElement;
// let NewUserPage = document.getElementById("new-user-page") as HTMLDivElement;
// let ExistingUserPage = document.getElementById("existing-user-page") as HTMLDivElement;
// let MedicinePage = document.getElementById("medicine-page") as HTMLDivElement;
// let MedicineInfoPage = document.getElementById("medicine-info") as HTMLDivElement;
// let PurchasePage = document.getElementById("purchase-block") as HTMLDivElement;
// let QuantityPage = document.getElementById("quantity-block") as HTMLDivElement;
// let CancelOrderPage = document.getElementById("cancel-order-block") as HTMLDivElement;
// let OrderHistoryPage = document.getElementById("order-history-block") as HTMLDivElement;
// let TopUpPage = document.getElementById("top-up-block") as HTMLDivElement;
// let ShowBalancePage = document.getElementById("show-balance-block") as HTMLDivElement;
//Display none function
// function display()
// {
//     HomePage.style.display="none";
//     NewUserPage.style.display="none";
//     ExistingUserPage.style.display="none";
//     MedicinePage.style.display="none";
//     MedicineInfoPage.style.display="none";
//     PurchasePage.style.display="none";
//     QuantityPage.style.display="none";
//     CancelOrderPage.style.display="none";
//     OrderHistoryPage.style.display="none";
//     TopUpPage.style.display="none";
//     ShowBalancePage.style.display="none";
// }
function homePage() {
    var homePage = document.getElementById("home-page");
    homePage.style.display = "block";
}
function newUser() {
    var home = document.getElementById("home-page");
    var newUser = document.getElementById("new-user-page");
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
    medicinePage();
    return false;
    // linkIn();
}
function existingUser() {
    var home = document.getElementById("home-page");
    var existingUser = document.getElementById("existing-user-page");
    var newUserPage = document.getElementById("new-user-page");
    home.style.display = "none";
    newUserPage.style.display = "none";
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
    var homePage = document.getElementById("home-page");
    var existingUserPage = document.getElementById('existing-user-page');
    var medicinePage = document.getElementById('medicine-page');
    var greet = document.getElementById('greet');
    homePage.style.display = "none";
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    return false;
    // greet.innerHTML = `<h3>Hello ${CurrentUserName}</h3>`;
}
function showMedicine() {
    var medicineInfoPage = document.getElementById("medicine-info");
    medicineInfoPage.style.display = "block";
    var table = document.getElementById("dataTable");
    table.innerHTML = "";
    // let medicineBtn = document.getElementById("medicine-btn") as HTMLButtonElement;
    var heading = document.createElement("tr");
    heading.innerHTML = "<th>".concat("MedicineID", "</th><th>").concat("Medicine Name", "</th><th>").concat("Medicine Count", "</th><th>").concat("Medicine Price", "</th><th>").concat("Expiry Date", "</th>");
    table.appendChild(heading);
    for (var i = 0; i < MedicineList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(MedicineList[i].MedicineId, "</td>\n        <td>").concat(MedicineList[i].MedicineName, "</td>\n        <td>").concat(MedicineList[i].MedicineCount, "</td>\n        <td>").concat(MedicineList[i].MedicinePrice, "</td>\n        <td>").concat(MedicineList[i].MedicineExpiryDate.toLocaleDateString("en-GB"), "</td>");
        table.appendChild(row);
    }
    // medicineBtn.disabled=true;
}
function Purchase() {
    var medicineInfoPage = document.getElementById("medicine-info");
    medicineInfoPage.style.display = "none";
    var purchasePage = document.getElementById("purchase-block");
    purchasePage.style.display = "block";
    var table = document.getElementById("purchase-table");
    table.innerHTML = "";
    // let purchaseBtn = document.getElementById("purchase-btn") as HTMLButtonElement;
    var heading = document.createElement("tr");
    heading.innerHTML = "<th>".concat("MedicineID", "</th><th>").concat("Medicine Name", "</th><th>").concat("Medicine Count", "</th><th>").concat("Medicine Price", "</th><th>").concat("Expiry Date", "</th><th></th>");
    table.appendChild(heading);
    for (var i = 0; i < MedicineList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(MedicineList[i].MedicineId, "</td>\n        <td>").concat(MedicineList[i].MedicineName, "</td>\n        <td>").concat(MedicineList[i].MedicineCount, "</td>\n        <td>").concat(MedicineList[i].MedicinePrice, "</td>\n        <td>").concat(MedicineList[i].MedicineExpiryDate.toLocaleDateString("en-GB"), "</td>\n        <td><button onclick=\"setGlobalMedicineId('").concat(MedicineList[i].MedicineId, "');\">buy</button></td>");
        table.appendChild(row);
    }
    // purchaseBtn.disabled=true;
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
    cancelOrderTable.innerHTML = "";
    // let cancelOrderBtn = document.getElementById("cancel-order-btn") as HTMLButtonElement;
    var heading = document.createElement("tr");
    heading.innerHTML = "<th>Order ID</th>\n    <th>User ID</th>\n    <th>Medicine ID</th>\n    <th>Medicine Name</th>\n    <th>Medicine Count</th>\n    <th>Total Price</th>\n    <th>Order Status</th>\n    <th></th>";
    cancelOrderTable.appendChild(heading);
    for (var i = 0; i < OrderList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(OrderList[i].OrderId, "</td>\n        <td>").concat(OrderList[i].UserId, "</td>\n        <td>").concat(OrderList[i].MedicineId, "</td>\n        <td>").concat(OrderList[i].MedicineName, "</td>\n        <td>").concat(OrderList[i].MedicineCount, "</td>\n        <td>").concat(OrderList[i].TotalPrice, "</td>\n        <td>").concat(OrderList[i].OrderStatus, "</td>\n        <td><button onclick=\"OrderCancel('").concat(OrderList[i].OrderId, "')\";>Cancel</button></td>");
        cancelOrderTable.appendChild(row);
    }
    // cancelOrderBtn.disabled=true;
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
    orderHistoryTable.innerHTML = "";
    // let orderHistoryBtn = document.getElementById("order-history-btn") as HTMLButtonElement;
    var heading = document.createElement("tr");
    heading.innerHTML = "<th>Order ID</th>\n    <th>User ID</th>\n    <th>Medicine ID</th>\n    <th>Medicine Name</th>\n    <th>Medicine Count</th>\n    <th>Total Price</th>\n    <th>Order Status</th>";
    orderHistoryTable.appendChild(heading);
    for (var i = 0; i < OrderList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(OrderList[i].OrderId, "</td>\n        <td>").concat(OrderList[i].UserId, "</td>\n        <td>").concat(OrderList[i].MedicineId, "</td>\n        <td>").concat(OrderList[i].MedicineName, "</td>\n        <td>").concat(OrderList[i].MedicineCount, "</td>\n        <td>").concat(OrderList[i].TotalPrice, "</td>\n        <td>").concat(OrderList[i].OrderStatus, "</td>");
        orderHistoryTable.appendChild(row);
    }
    // orderHistoryBtn.disabled=true;
}
function TopUp() {
    var topUpPage = document.getElementById("top-up-block");
    topUpPage.style.display = "block";
}
function getAmount() {
    var amount = parseInt(document.getElementById("top-up-amount").value);
    CurrentloggedInUser.rechargeWallet(amount);
    alert("Recharge Successful - Balance : ".concat(CurrentloggedInUser.showBalance()));
}
function ShowBalance() {
    var showBalancePage = document.getElementById("show-balance-block");
    showBalancePage.style.display = "block";
    showBalancePage.innerHTML = "";
    var line = document.createElement("p");
    line.innerHTML = "Current Balance - ".concat(CurrentloggedInUser.showBalance());
    showBalancePage.appendChild(line);
}
