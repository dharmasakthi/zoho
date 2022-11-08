var total_taxi = 5;
var distance_per_point = 15;
var time_per_point = 1;
var path = ['A', 'B', 'C', 'D', 'E', 'F'];
var Taxi = /** @class */ (function () {
    function Taxi(taxi_id) {
        this.taxi_id = taxi_id;
        this.location = 'A';
        this.ride = [];
        this.total_earnings = 0;
        this.free_time = 6;
    }
    Taxi.print_taxi = function (taxies) {
        taxies.forEach(function (values) {
            var output = "Taxi-".concat(values.taxi_id, " \t Total Earnings : ").concat(values.total_earnings);
            if (values.ride.length > 0) {
                values.ride.forEach(function (val) {
                    output += "\n".concat(val.booking_id, " ").concat(val.customer_id, " ").concat(val.from, " ").concat(val.to, " ").concat(val.pickup_time, " ").concat(val.drop_time, " ").concat(val.earnings);
                });
            }
            console.log("".concat(output, "\n\n"));
        });
    };
    Taxi.prototype.calculate_traiff = function (customer_id, pickup, drop, pickup_time) {
        Taxi.booking_id++;
        var distance = Math.abs(path.indexOf(pickup) - path.indexOf(drop));
        var earnings;
        earnings = (((distance * 15) - 5) * 10) + 100;
        this.free_time = pickup_time + distance;
        this.location = drop;
        this.total_earnings += earnings;
        var ride = {
            booking_id: Taxi.booking_id,
            customer_id: customer_id,
            from: pickup,
            to: drop,
            pickup_time: pickup_time,
            drop_time: this.free_time,
            earnings: earnings
        };
        this.ride.push(ride);
    };
    Taxi.get_taxi = function (pickup_point, pickup, taxies) {
        var taxi = {
            earnings: Number.MAX_VALUE,
            taxi_index: -1
        };
        taxies.forEach(function (values, i) {
            if (values.location === pickup_point && pickup > values.free_time) {
                if (values.total_earnings < taxi.earnings) {
                    taxi.taxi_index = i;
                    taxi.earnings = values.total_earnings;
                }
            }
        });
        if (taxi.taxi_index === -1) {
            return false;
        }
        else {
            return taxi;
        }
    };
    var _a;
    _a = Taxi;
    Taxi.booking_id = 0;
    Taxi.select_taxi_at_location = function (pickup_point, pickup, taxies) {
        var front;
        var back;
        front = back = path.indexOf(pickup_point);
        var result = _a.get_taxi(pickup_point, pickup, taxies);
        if (result) {
            return result;
        }
        else {
            while (front - 1 >= 0 && back + 1 < path.length) {
                front--;
                back++;
                var l_near = void 0;
                var r_near = void 0;
                if (front >= 0 && back < path.length) {
                    l_near = _a.get_taxi(path[front], pickup, taxies);
                    r_near = _a.get_taxi(path[back], pickup, taxies);
                    if (l_near && r_near) {
                        if (r_near.earnings < l_near.earnings) {
                            return r_near;
                        }
                        else {
                            return l_near;
                        }
                    }
                    else if (l_near) {
                        return l_near;
                    }
                    else if (r_near) {
                        return r_near;
                    }
                }
            }
            if (front == 0) {
                var r_near = void 0;
                while (back + 1 < path.length - 1) {
                    back++;
                    r_near = _a.get_taxi(path[back], pickup, taxies);
                    if (r_near) {
                        return r_near;
                    }
                }
            }
            else if (back == path.length - 1) {
                var l_near = void 0;
                while (front - 1 >= 0) {
                    front--;
                    l_near = _a.get_taxi(path[front], pickup, taxies);
                    if (l_near) {
                        return l_near;
                    }
                }
            }
        }
        return false;
    };
    return Taxi;
}());
var input = [
    {
        customer_id: 1,
        pickup: 'A',
        drop: "B",
        pickup_time: 9
    },
    {
        customer_id: 2,
        pickup: 'B',
        drop: "D",
        pickup_time: 10
    },
    {
        customer_id: 3,
        pickup: 'D',
        drop: "B",
        pickup_time: 12
    },
    {
        customer_id: 4,
        pickup: 'B',
        drop: "D",
        pickup_time: 10
    },
    {
        customer_id: 5,
        pickup: 'D',
        drop: "B",
        pickup_time: 12
    },
    {
        customer_id: 6,
        pickup: 'B',
        drop: "D",
        pickup_time: 10
    },
    {
        customer_id: 7,
        pickup: 'B',
        drop: "D",
        pickup_time: 9
    }
];
var Taxies = [];
for (var i = 1; i < total_taxi; i++) {
    Taxies.push(new Taxi(i));
}
input.forEach(function (values) {
    var select_taxi = Taxi.select_taxi_at_location(values.pickup, values.pickup_time, Taxies);
    if (select_taxi) {
        Taxies[select_taxi.taxi_index].calculate_traiff(values.customer_id, values.pickup, values.drop, values.pickup_time);
        console.log("\nTaxi can be allocated..");
        console.log("Taxi-".concat(select_taxi.taxi_index + 1, " is allocated\n\n"));
    }
    else {
        console.log("Booking Rejected..\n\n");
    }
});
Taxi.print_taxi(Taxies);
