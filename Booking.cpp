#include "Booking.h"
#include "Color.h"

void Booking::bookPC() {

    setColor(14);

    cout << "\n========== BOOK PC ==========\n";

    setColor(7);

    cout << "\nEnter Student ID: ";
    cin >> studentID;

    cout << "Enter PC ID: ";
    cin >> pcID;

    ofstream file("booking.txt", ios::app);

    file << studentID << " "
         << pcID << endl;

    file.close();

    setColor(10);

    cout << "\nBooking Successful!\n";

    setColor(7);
}

void Booking::viewBookings() {

    ifstream file("booking.txt");

    int sid;
    int pid;

    setColor(11);

    cout << "\n===== BOOKINGS =====\n";

    setColor(7);

    while(file >> sid >> pid) {

        cout << "Student ID: "
             << sid
             << " -> PC ID: "
             << pid
             << endl;
    }

    file.close();
}
