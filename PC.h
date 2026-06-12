#ifndef PC_H
#define PC_H

#include <iostream>
#include <fstream>
#include <string>

using namespace std;

class PC {

private:

    int pcID;
    string status;

public:

    void inputPC();
    void displayPC();
    void savePCToFile();

    void viewAllPCs();
    void searchPC();

    void updatePC();
    void deletePC();
};

#endif
