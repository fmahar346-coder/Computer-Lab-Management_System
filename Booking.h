#ifndef BOOKING_H
#define BOOKING_H

#include <iostream>
#include <fstream>
#include <string>

using namespace std;

class Booking {

private:

    int studentID;
    int pcID;

public:

    void bookPC();

    void viewBookings();
};

#endif
