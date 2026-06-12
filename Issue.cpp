#include "Issue.h"
#include "Color.h"

void Issue::reportIssue() {

    setColor(14);

    cout << "\n========== REPORT ISSUE ==========\n";

    setColor(7);

    cout << "\nEnter Issue ID: ";
    cin >> issueID;

    cin.ignore();

    cout << "Enter Issue Description: ";
    getline(cin, description);

    ofstream file("issues.txt", ios::app);

    file << issueID << " "
         << description << endl;

    file.close();

    setColor(10);

    cout << "\nIssue Reported Successfully!\n";

    setColor(7);
}

void Issue::viewIssues() {

    ifstream file("issues.txt");

    int id;
    string desc;

    setColor(11);

    cout << "\n===== REPORTED ISSUES =====\n";

    setColor(7);

    while(file >> id) {

        getline(file, desc);

        cout << "Issue ID: " << id << endl;
        cout << "Description:" << desc << endl;
        cout << "----------------------\n";
    }

    file.close();
}
