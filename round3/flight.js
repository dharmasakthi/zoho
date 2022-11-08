var Flights = /** @class */ (function () {
    function Flights(flightId) {
        this.flight = {
            id: flightId,
            economySeats: 12,
            businessSeats: 6,
            economyPrice: 1000,
            businessAvail: [1, 2, 3, 4, 5, 6],
            economyAvail: [7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18],
            businessPrice: 2000,
            economySurgePrice: 100,
            businessSurgePrice: 200,
            businessBookingCount: 0,
            cancelationPrice: 200,
            mealPrice: 200,
            ecomonyBookingCount: 0,
            cancelationCount: 0,
            totalCost: 0,
            bookedSeats: [],
            mealsBooked: []
        };
        this.Booking = [];
    }
    Flights.prototype.updation = function (bookingId, operation, tickeClass, totalSeats, meal) {
        var addon;
        if (tickeClass == "BC") {
            if (this.flight.businessSeats >= totalSeats) {
                var surcharge = 200 * this.flight.businessBookingCount;
                var seatCost = totalSeats * (this.flight.businessPrice + surcharge);
                var mealCost = meal == 'Y' ? this.flight.mealPrice * totalSeats : 0;
                var totalCost = seatCost + mealCost;
                this.flight.businessSeats -= totalSeats;
                this.flight.businessBookingCount += 1;
                var avail = this.flight.businessAvail.splice(0, totalSeats);
                if (meal == 'Y') {
                    this.flight.mealsBooked.concat(avail);
                    console.log(" this.flight.mealsBooked.concat(avail);", this.flight.mealsBooked.concat(avail));
                }
                addon = {
                    bookingId: bookingId,
                    operation: operation,
                    seatClass: tickeClass,
                    meal: meal,
                    totalSeats: totalSeats,
                    seats: avail,
                    totalCost: totalCost,
                    cancel: false,
                    cancelationCharge: 0,
                    refundAmount: 0
                };
                this.flight.totalCost += totalCost;
                this.Booking.push(addon);
                this.flight.bookedSeats = this.flight.bookedSeats.concat(avail);
            }
            else {
                console.log("\nBooking Rejected...\n");
            }
        }
        else if (tickeClass == "EC") {
            if (this.flight.economySeats >= totalSeats) {
                var surcharge = 100 * this.flight.ecomonyBookingCount;
                var seatCost = totalSeats * (this.flight.economyPrice + surcharge);
                var mealCost = meal == 'Y' ? this.flight.mealPrice * totalSeats : 0;
                var totalCost = seatCost + mealCost;
                this.flight.economySeats -= totalSeats;
                this.flight.ecomonyBookingCount += 1;
                var avail = this.flight.economyAvail.splice(0, totalSeats);
                if (meal == 'Y') {
                    this.flight.mealsBooked.concat(avail);
                    console.log(" this.flight.mealsBooked.concat(avail);", this.flight.mealsBooked.concat(avail));
                }
                addon = {
                    bookingId: bookingId,
                    operation: operation,
                    seatClass: tickeClass,
                    meal: meal,
                    seats: avail,
                    totalSeats: totalSeats,
                    totalCost: totalCost,
                    cancel: false,
                    cancelationCharge: 0,
                    refundAmount: 0
                };
                this.flight.totalCost += totalCost;
                this.Booking.push(addon);
                this.flight.bookedSeats = this.flight.bookedSeats.concat(avail);
            }
            else {
                console.log("\nBooking Rejected...\n");
            }
        }
    };
    Flights.cancel = function (flights, booking_id, operation) {
        var found;
        found = false;
        for (var i = 0; i < flights.length; i++) {
            for (var j = 0; j < flights[i].Booking.length; j++) {
                if (flights[i].Booking[j].bookingId == booking_id) {
                    found = true;
                    if (flights[i].Booking[j].seatClass == "BC") {
                        flights[i].flight.businessAvail = flights[i].flight.businessAvail.concat(flights[i].Booking[j].seats);
                        flights[i].flight.businessAvail.sort(function (a, b) { return a - b; });
                    }
                    else if (flights[i].Booking[j].seatClass == "EC") {
                        flights[i].flight.economyAvail = flights[i].flight.economyAvail.concat(flights[i].Booking[j].seats);
                        flights[i].flight.economyAvail.sort(function (a, b) { return a - b; });
                    }
                    // remove booked seats in seats bookes
                    for (var k = 0; k < flights[i].Booking[j].seats.length; k++) {
                        var value = flights[i].Booking[j].seats[k];
                        var seatIndex = flights[i].flight.bookedSeats.indexOf(value);
                        if (flights[i].Booking[j].meal == 'Y') {
                            console.log("flights[i].flight.bookedSeats", flights[i].flight.bookedSeats);
                            console.log("flights[i].Booking[j].seats", flights[i].Booking[j].seats);
                            var mealIndex = flights[i].flight.mealsBooked.indexOf(value);
                            if (mealIndex >= 0) {
                                flights[i].flight.mealsBooked.splice(mealIndex, 1);
                            }
                        }
                        if (seatIndex >= 0) {
                            flights[i].flight.bookedSeats.splice(seatIndex, 1);
                        }
                    }
                    flights[i].flight.bookedSeats.sort(function (a, b) { return a - b; });
                    var cancelationCharge = flights[i].Booking[j].totalSeats * 200;
                    var refund = flights[i].Booking[j].totalCost - cancelationCharge;
                    flights[i].Booking[j].cancel = true;
                    flights[i].Booking[j].cancelationCharge = cancelationCharge;
                    flights[i].Booking[j].refundAmount = refund;
                    flights[i].flight.totalCost -= refund;
                    if (flights[i].Booking[j].seatClass == "BC") {
                        flights[i].flight.businessSeats += flights[i].Booking[j].totalSeats;
                    }
                    else if (flights[i].Booking[j].seatClass == "EC") {
                        flights[i].flight.economySeats += flights[i].Booking[j].totalSeats;
                    }
                    break;
                }
            }
            if (found) {
                break;
            }
        }
    };
    Flights.printAll = function (flights) {
        for (var i = 0; i < flights.length; i++) {
            for (var j = 0; j < flights[i].Booking.length; j++) {
                if (flights[i].Booking[j].cancel) {
                    var output = "";
                    output += "BookingId: ".concat(flights[i].Booking[j].bookingId, "\n");
                    output += "Flight Number: ".concat(flights[i].flight.id, "\n");
                    output += "Cancelled \n Total Cost : ".concat(flights[i].Booking[j].cancelationCharge, "\n");
                    console.log(output);
                }
                else {
                    var output = "";
                    output += "BookingId: ".concat(flights[i].Booking[j].bookingId, "\n");
                    output += "Flight Number: ".concat(flights[i].flight.id, "\n");
                    output += flights[i].Booking[j].seatClass == "BC" ? "Business Class : ".concat(flights[i].Booking[j].seats) : "Economy Class : ".concat(flights[i].Booking[j].seats);
                    output += "\nTotal Cost : ".concat(flights[i].Booking[j].totalCost, "\n");
                    console.log(output);
                }
            }
        }
    };
    Flights.printFlights = function (flights) {
        for (var i = 0; i < flights.length; i++) {
            var output = '';
            output += "Summary of Flight Number : ".concat(flights[i].flight.id, "\n");
            output += "Total Cost : ".concat(flights[i].flight.totalCost, "\n");
            output += "Seats Booked : ".concat(flights[i].flight.bookedSeats, "\n");
            // output += `Meals Booked : ${flights[i].flight.mealsBooked}\n`       
            output += "Seats Available : ".concat(flights[i].flight.businessAvail, ",").concat(flights[i].flight.economyAvail, "\n");
            console.log(output);
        }
    };
    return Flights;
}());
var fly = [101, 102, 103, 104, 105];
var Flight = [];
for (var i = 0; i < fly.length; i++) {
    Flight.push(new Flights(fly[i]));
}
// interface inputGet {
//     bookingId : number;
//     operation : operation;
//     flightNo : number;
//     seatClass : ticketClass;
//     totalSeats : number;
//     meal : string;
// }
var input = [
    {
        bookingId: 1,
        operation: "B",
        flightNo: 101,
        seatClass: "EC",
        totalSeats: 2,
        meal: 'Y'
    },
    {
        bookingId: 2,
        operation: "B",
        flightNo: 101,
        seatClass: "EC",
        totalSeats: 2,
        meal: 'N'
    },
    {
        bookingId: 3,
        operation: "B",
        flightNo: 102,
        seatClass: "EC",
        totalSeats: 4,
        meal: 'Y'
    },
    {
        bookingId: 4,
        operation: "B",
        flightNo: 102,
        seatClass: "BC",
        totalSeats: 2,
        meal: 'N'
    },
    {
        bookingId: 2,
        operation: "C",
        flightNo: 0,
        seatClass: "",
        totalSeats: 0,
        meal: ''
    }
];
for (var i = 0; i < input.length; i++) {
    if (input[i].operation == "B") {
        var index = input[i].flightNo - 101;
        Flight[index].updation(input[i].bookingId, input[i].operation, input[i].seatClass, input[i].totalSeats, input[i].meal);
    }
    else {
        Flights.cancel(Flight, input[i].bookingId, input[i].operation);
    }
}
Flights.printAll(Flight);
Flights.printFlights(Flight);
