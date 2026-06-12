#include "PC.h"
#include <cstdio>

void PC::inputPC() {

    cout << "\nEnter PC ID: ";
    cin >> pcID;

    cin.ignore();

    cout << "Enter Status: ";
    getline(cin, status);
}

void PC::displayPC() {

    cout << "\n===== PC DETAILS =====\n";

    cout << "PC ID: " << pcID << endl;
    cout << "Status: " << status << endl;
}

void PC::savePCToFile() {

    ofstream file("pc_data.txt", ios::app);

    file << pcID << " " << status << endl;

    file.close();

    cout << "\nPC Data Saved Successfully!\n";
}

void PC::viewAllPCs() {

    ifstream file("pc_data.txt");

    int id;
    string stat;

    cout << "\n===== ALL PC RECORDS =====\n";

    while(file >> id >> stat) {

        cout << "PC ID: " << id << endl;
        cout << "Status: " << stat << endl;
        cout << "------------------" << endl;
    }

    file.close();
}

void PC::searchPC() {

    ifstream file("pc_data.txt");

    int searchID;
    int id;
    string stat;

    bool found = false;

    cout << "\nEnter PC ID to Search: ";
    cin >> searchID;

    while(file >> id >> stat) {

        if(id == searchID) {

            cout << "\nPC Found!" << endl;
            cout << "PC ID: " << id << endl;
            cout << "Status: " << stat << endl;

            found = true;
            break;
        }
    }

    if(!found) {

        cout << "\nPC Not Found!" << endl;
    }

    file.close();
}
void PC::updatePC() {

    int searchID;
    int id;

    string stat;

    bool found = false;

    cout << "\nEnter PC ID to Update: ";
    cin >> searchID;

    ifstream file("pc_data.txt");
    ofstream temp("temp.txt");

    while(file >> id >> stat) {

        if(id == searchID) {

            found = true;

            cout << "Enter New Status: ";

            cin.ignore();

            getline(cin, stat);

            temp << id << " " << stat << endl;

            cout << "\nPC Updated Successfully!\n";
        }

        else {

            temp << id << " " << stat << endl;
        }
    }

    file.close();
    temp.close();

    remove("pc_data.txt");
    rename("temp.txt", "pc_data.txt");

    if(!found) {

        cout << "\nPC Not Found!\n";
    }
}
void PC::deletePC() {

    int searchID;
    int id;

    string stat;

    bool found = false;

    cout << "\nEnter PC ID to Delete: ";
    cin >> searchID;

    ifstream file("pc_data.txt");
    ofstream temp("temp.txt");

    while(file >> id >> stat) {

        if(id == searchID) {

            found = true;

            cout << "\nPC Deleted Successfully!\n";
        }

        else {

            temp << id << " " << stat << endl;
        }
    }

    file.close();
    temp.close();

    remove("pc_data.txt");
    rename("temp.txt", "pc_data.txt");

    if(!found) {

        cout << "\nPC Not Found!\n";
    }
}

