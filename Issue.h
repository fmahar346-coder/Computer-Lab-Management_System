#ifndef ISSUE_H
#define ISSUE_H

#include <iostream>
#include <fstream>
#include <string>

using namespace std;

class Issue {

private:
    int issueID;
    string description;

public:

    void reportIssue();

    void viewIssues();
};

#endif
