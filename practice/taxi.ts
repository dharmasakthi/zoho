interface ride
{
    booking_id : number;
    customer_id : number;
    from : location;
    to : location;
    pickup_time : number;
    drop_time: number;
    earnings: number;
}
interface GetTaxi
{
    taxi_index : number;
    earnings : number;
}
type location = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
const total_taxi = 5;
const distance_per_point = 15;
const time_per_point = 1;

const path: location[] = ['A','B','C','D','E','F'];

class Taxi 
{
    private taxi_id : number;
    private location : location;
    private ride : ride[];
    private total_earnings: number;
    private free_time : number;
    private static booking_id : number = 0;
    constructor(taxi_id: number)
    {
        this.taxi_id = taxi_id;
        this.location = 'A';
        this.ride = [];
        this.total_earnings = 0;
        this.free_time = 6;
    }

    static print_taxi(taxies : Taxi[])
    {
        taxies.forEach((values) => {
            let output : string = `Taxi-${values.taxi_id} \t Total Earnings : ${values.total_earnings}`;
            if(values.ride.length > 0)
            {
                values.ride.forEach((val) =>{
                    output += `\n${val.booking_id} ${val.customer_id} ${val.from} ${val.to} ${val.pickup_time} ${val.drop_time} ${val.earnings}`
                })
            }
            console.log(`${output}\n\n`);

        })
    }

    calculate_traiff (customer_id : number, pickup : location, drop: location, pickup_time : number)
    {
        Taxi.booking_id++;
        let distance : number = Math.abs(path.indexOf(pickup) - path.indexOf(drop));
        let earnings : number;
        earnings = (((distance*15)-5)*10)+100 ;
        this.free_time = pickup_time + distance;
        this.location = drop;
        this.total_earnings += earnings;

        let ride : ride = {
            booking_id : Taxi.booking_id,
            customer_id : customer_id,
            from : pickup,
            to : drop,
            pickup_time : pickup_time,
            drop_time: this.free_time,
            earnings: earnings
        }
        this.ride.push(ride);
    }

    static select_taxi_at_location = (pickup_point : location, pickup : number,taxies : Taxi[]) => {
        let front : number;
        let back : number;
        front = back = path.indexOf(pickup_point);
        let result = this.get_taxi(pickup_point, pickup, taxies);

        if(result)
        {
            return result
        } else {
            while(front-1 >= 0 && back+1 < path.length)
            {
                front--;
                back++;
                let l_near : false | GetTaxi;
                let r_near : false | GetTaxi;
                if(front >= 0 && back < path.length)
                {
                    l_near = this.get_taxi(path[front], pickup, taxies);
                    r_near = this.get_taxi(path[back], pickup, taxies);
                    if(l_near && r_near)
                    {
                        if(r_near.earnings < l_near.earnings)
                        {
                            return r_near;
                        }
                        else
                        {
                            return l_near;
                        }
                    } else if(l_near)
                    {
                        return l_near;
                    } else if(r_near)
                    {
                        return r_near;
                    }
                }
            }
            if(front == 0)
            {
                let r_near : false | GetTaxi;
                while(back+1 < path.length-1)
                {
                    back++;
                    r_near = this.get_taxi(path[back], pickup, taxies);
                    if(r_near)
                    {
                        return r_near
                    }
                }
            } 
            else if(back == path.length-1)
            {
                let l_near : false | GetTaxi;
                while(front-1 >= 0)
                {
                    front--;
                    l_near = this.get_taxi(path[front], pickup, taxies);
                    if(l_near)
                    {
                        return l_near
                    }
                }

            }
        }
        return false;
    }
    static get_taxi(pickup_point : location, pickup : number,taxies : Taxi[]) 
    {
        let taxi : GetTaxi = {
            earnings : Number.MAX_VALUE,
            taxi_index : -1,
        };
        taxies.forEach((values, i) => 
        {
            if(values.location === pickup_point && pickup > values.free_time)
            {
                if(values.total_earnings < taxi.earnings)
                {
                    taxi.taxi_index = i;
                    taxi.earnings = values.total_earnings;
                }
            }
        })
        if(taxi.taxi_index === -1)
        {
            return false;
        } else {
            return taxi;
        }
    }

}



// input
// customer Id = 1;
// pickup : A
// Drop : C
// Pickup : 9
interface Input {
    customer_id : number;
    pickup : location;
    drop : location
    pickup_time : number;
}

const input: Input[]= [
    {
        customer_id : 1,
        pickup : 'A',
        drop : "B",
        pickup_time : 9
    },
    {
        customer_id : 2,
        pickup : 'B',
        drop : "D",
        pickup_time : 10
    },
    {
        customer_id : 3,
        pickup : 'D',
        drop : "B",
        pickup_time : 12
    },
    {
        customer_id : 4,
        pickup : 'B',
        drop : "D",
        pickup_time : 10
    },
    {
        customer_id : 5,
        pickup : 'D',
        drop : "B",
        pickup_time : 12
    },
    {
        customer_id : 6,
        pickup : 'B',
        drop : "D",
        pickup_time : 10
    },
    {
        customer_id : 7,
        pickup : 'B',
        drop : "D",
        pickup_time : 9
    }
]

const Taxies : Taxi[] = [];
for(let i=1; i<total_taxi; i++)
{
    Taxies.push(new Taxi(i));
}

input.forEach((values) => 
{
    let select_taxi = Taxi.select_taxi_at_location(values.pickup, values.pickup_time, Taxies);
    if(select_taxi)
    {
        Taxies[select_taxi.taxi_index].calculate_traiff(values.customer_id, values.pickup, values.drop, values.pickup_time);
        console.log("\nTaxi can be allocated..");
        console.log(`Taxi-${select_taxi.taxi_index+1} is allocated\n\n`);
    } else {
        console.log("Booking Rejected..\n\n");
    }
})

Taxi.print_taxi(Taxies);



