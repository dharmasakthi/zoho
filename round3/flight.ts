interface flightInter
{
    id : number | undefined;
    economySeats : number;
    economyAvail : number[];
    businessAvail : number[];
    businessSeats : number;
    economyPrice : number;
    businessPrice : number;
    businessBookingCount : number;
    ecomonyBookingCount : number;
    economySurgePrice : number;
    businessSurgePrice : number;
    mealPrice : number;
    cancelationPrice : number;
    cancelationCount : number;
    totalCost : number;
    bookedSeats : number[];
    mealsBooked : number[];
}
type flightId = '101' | '102' | '103' | '104';
type operation = 'B' | 'C';
type ticketClass = 'EC' | 'BC';
interface Booking {
    bookingId : number;
    operation : string;
    seatClass : ticketClass;
    totalSeats : number;
    seats : number[];
    meal : string;
    totalCost : number;
    cancel : boolean;
    cancelationCharge : number;
    refundAmount : number;
}

class Flights {
    public flight : flightInter;
    public Booking : Booking[];
    constructor(flightId : number)
    {
        this.flight = {
            id : flightId,
            economySeats : 12,
            businessSeats : 6,
            economyPrice : 1000,
            businessAvail : [1, 2, 3, 4, 5, 6],
            economyAvail : [7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18],
            businessPrice : 2000,
            economySurgePrice : 100,
            businessSurgePrice : 200,
            businessBookingCount : 0,
            cancelationPrice : 200,
            mealPrice : 200,
            ecomonyBookingCount : 0,
            cancelationCount : 0,
            totalCost : 0,
            bookedSeats : [],
            mealsBooked : [],
        }
        this.Booking = [];
    }
    public updation(bookingId : number, operation : string, tickeClass : string, totalSeats : number, meal : string)
    {
            let addon : Booking;
            if (tickeClass == "BC")
            {
                if(this.flight.businessSeats >= totalSeats)
                {
                    let surcharge = 200 * this.flight.businessBookingCount ;
                    let seatCost = totalSeats * (this.flight.businessPrice + surcharge);
                    let mealCost = meal == 'Y' ? this.flight.mealPrice * totalSeats : 0;
                    let totalCost = seatCost + mealCost;
                    this.flight.businessSeats -= totalSeats;
                    this.flight.businessBookingCount += 1;
                    let avail = this.flight.businessAvail.splice(0,totalSeats);

                    if(meal == 'Y')
                    {
                        this.flight.mealsBooked.concat(avail);
                        console.log(" this.flight.mealsBooked.concat(avail);", this.flight.mealsBooked.concat(avail))
                    }

                    addon = {
                        bookingId : bookingId,
                        operation : operation,
                        seatClass : tickeClass,
                        meal : meal,
                        totalSeats : totalSeats,
                        seats : avail,
                        totalCost : totalCost,
                        cancel : false,
                        cancelationCharge : 0,
                        refundAmount : 0
                    }
                    this.flight.totalCost += totalCost;
                    this.Booking.push(addon);
                    this.flight.bookedSeats = this.flight.bookedSeats.concat(avail)
                } else {
                    console.log("\nBooking Rejected...\n")
                }
            } else if (tickeClass == "EC") {
                if(this.flight.economySeats >= totalSeats)
                {
                    let surcharge = 100 * this.flight.ecomonyBookingCount;
                    let seatCost = totalSeats * (this.flight.economyPrice + surcharge);
                    let mealCost = meal == 'Y' ? this.flight.mealPrice * totalSeats : 0;
                    let totalCost = seatCost + mealCost;
                    this.flight.economySeats -= totalSeats;
                    this.flight.ecomonyBookingCount += 1;
                    let avail = this.flight.economyAvail.splice(0,totalSeats);

                    if(meal == 'Y')
                    {
                        this.flight.mealsBooked.concat(avail);
                        console.log(" this.flight.mealsBooked.concat(avail);", this.flight.mealsBooked.concat(avail))
                    }
                    addon = {
                        bookingId : bookingId,
                        operation : operation,
                        seatClass : tickeClass,
                        meal : meal,
                        seats : avail,
                        totalSeats : totalSeats,
                        totalCost : totalCost,
                        cancel : false,
                        cancelationCharge : 0,
                        refundAmount : 0
                    }
                    this.flight.totalCost += totalCost;
                    this.Booking.push(addon);
                    this.flight.bookedSeats = this.flight.bookedSeats.concat(avail)
                } else {
                    console.log("\nBooking Rejected...\n");
                }
            }
    }
    static cancel(flights : Flights[],booking_id : number, operation : string)
    {
        let found : boolean;
        found = false;

        for(let i=0; i<flights.length; i++)
        {
            for(let j=0; j<flights[i].Booking.length; j++)
            {
                if(flights[i].Booking[j].bookingId == booking_id)
                {
                    found = true;
                    if(flights[i].Booking[j].seatClass == "BC")
                    {
                        flights[i].flight.businessAvail = flights[i].flight.businessAvail.concat(flights[i].Booking[j].seats);
                        flights[i].flight.businessAvail.sort((a,b) => a-b);
                    }
                    else if(flights[i].Booking[j].seatClass == "EC") {
                        flights[i].flight.economyAvail = flights[i].flight.economyAvail.concat(flights[i].Booking[j].seats);
                        flights[i].flight.economyAvail.sort((a,b) => a-b);
                    }
                    // remove booked seats in seats bookes
                    for(let k=0; k<flights[i].Booking[j].seats.length; k++)
                    {
                        let value = flights[i].Booking[j].seats[k];
                        let seatIndex = flights[i].flight.bookedSeats.indexOf(value);
                        if(flights[i].Booking[j].meal == 'Y')
                        {
                            console.log("flights[i].flight.bookedSeats", flights[i].flight.bookedSeats);
                            console.log("flights[i].Booking[j].seats", flights[i].Booking[j].seats);

                            let mealIndex = flights[i].flight.mealsBooked.indexOf(value);
                            if(mealIndex >=0 )
                            {
                                flights[i].flight.mealsBooked.splice(mealIndex,1);
                            }
                        }
                        if(seatIndex >=0 )
                        {
                            flights[i].flight.bookedSeats.splice(seatIndex,1);
                        }
                    }

                    flights[i].flight.bookedSeats.sort((a,b) => a-b);

                    let cancelationCharge : number = flights[i].Booking[j].totalSeats * 200;
                    let refund : number = flights[i].Booking[j].totalCost - cancelationCharge;
                    flights[i].Booking[j].cancel = true;
                    flights[i].Booking[j].cancelationCharge = cancelationCharge;
                    flights[i].Booking[j].refundAmount = refund;
                    flights[i].flight.totalCost -= refund;
                    if(flights[i].Booking[j].seatClass == "BC") {
                        flights[i].flight.businessSeats += flights[i].Booking[j].totalSeats;
                    } else if(flights[i].Booking[j].seatClass == "EC") {
                        flights[i].flight.economySeats += flights[i].Booking[j].totalSeats;
                    }
                    break;
                }
            }
            if(found) 
            {
                break;
            }
        }
    }
    static printAll(flights : Flights[])
    {
        for(let i=0; i<flights.length; i++)
        {
            for(let j=0; j<flights[i].Booking.length; j++)
            {
                if(flights[i].Booking[j].cancel)
                {
                    let output : string = "";
                    output += `BookingId: ${flights[i].Booking[j].bookingId}\n`;
                    output += `Flight Number: ${flights[i].flight.id}\n`;
                    output += `Cancelled \n Total Cost : ${flights[i].Booking[j].cancelationCharge}\n`;
                    console.log(output)
                }
                else {
                    let output : string = "";
                    output += `BookingId: ${flights[i].Booking[j].bookingId}\n`;
                    output += `Flight Number: ${flights[i].flight.id}\n`;
                    output += flights[i].Booking[j].seatClass == "BC" ? `Business Class : ${flights[i].Booking[j].seats}` : `Economy Class : ${flights[i].Booking[j].seats}`
                    output += `\nTotal Cost : ${flights[i].Booking[j].totalCost}\n`;
                    console.log(output)
                }
            }
        }
    }
    static printFlights(flights : Flights[])
    {
        for(let i=0; i<flights.length; i++)
        {
            let output : string = '';
            output += `Summary of Flight Number : ${flights[i].flight.id}\n`;
            output += `Total Cost : ${flights[i].flight.totalCost}\n`;            
            output += `Seats Booked : ${flights[i].flight.bookedSeats}\n`;     
            // output += `Meals Booked : ${flights[i].flight.mealsBooked}\n`       
            output += `Seats Available : ${flights[i].flight.businessAvail},${flights[i].flight.economyAvail}\n`;
            console.log(output);
        }
    }
}

let fly : number[]= [101, 102, 103, 104, 105];
const Flight : Flights[] = [];
for(let i=0; i<fly.length; i++)
{
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

let input = [
    {
        bookingId : 1,
        operation : "B",
        flightNo : 101,
        seatClass : "EC",
        totalSeats : 2,
        meal : 'Y'
    },
    {
        bookingId : 2,
        operation : "B",
        flightNo : 101,
        seatClass : "EC",
        totalSeats : 2,
        meal : 'N'
    },
    {
        bookingId : 3,
        operation : "B",
        flightNo : 102,
        seatClass : "EC",
        totalSeats : 4,
        meal : 'Y'
    },
    {
        bookingId : 4,
        operation : "B",
        flightNo : 102,
        seatClass : "BC",
        totalSeats : 2,
        meal : 'N'
    },
    {
        bookingId : 2,
        operation : "C",
        flightNo : 0,
        seatClass : "",
        totalSeats : 0,
        meal : ''
    }
]

for(let i=0; i<input.length; i++)
{
    if(input[i].operation == "B")
    {
        let index = input[i].flightNo - 101;
        Flight[index].updation(input[i].bookingId, input[i].operation, input[i].seatClass, input[i].totalSeats, input[i].meal);

    } else {
        Flights.cancel(Flight,input[i].bookingId, input[i].operation);
    }
}

Flights.printAll(Flight)
Flights.printFlights(Flight)
