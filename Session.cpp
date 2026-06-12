#include "Session.h"
#include "Color.h"

void Session::startSession() {

    ofstream file("session.txt", ios::app);

    file << "Session Started" << endl;

    file.close();

    setColor(10);

    cout << "\nSession Started!\n";

    setColor(7);
}

void Session::endSession() {

    ofstream file("session.txt", ios::app);

    file << "Session Ended" << endl;

    file.close();

    setColor(12);

    cout << "\nSession Ended!\n";

    setColor(7);
}
