#ifndef COLOR_H
#define COLOR_H

#include <windows.h>

inline void setColor(int color) {
    SetConsoleTextAttribute(
        GetStdHandle(STD_OUTPUT_HANDLE),
        color
    );
}

#endif
